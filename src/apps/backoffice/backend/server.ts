import Koa from "koa";
import http from "http";
import httpStatus from "http-status";
import requestId from "koa-requestid";
import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";
import responseTime from "koa-response-time";
import { Logger } from "../../../contexts/shared/domain/logger";
import { registerRoutes } from "./routes";
import { configureRequestScope } from "./middlewares/configure-request-scope.middleware";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { logRequestResponse } from "./middlewares/log-request-response.middleware";
import { config } from "../../../contexts/backoffice/shared/infrastructure/config";
import { authentication } from "./middlewares/authentication.middleware";
import { getApiUsers } from "./get-api-users";
import { container } from "./dependency-injection/container";
import { getApiV1Router, getHealthRouter } from "./routers";

export class Server {
  private koa: Koa;
  readonly port: number;
  private logger: Logger;
  httpServer?: http.Server;

  constructor(dependencies: { port: number }) {
    this.logger = container.resolve<Logger>("logger");
    this.port = dependencies.port;
    this.koa = new Koa();

    this.configureRoutesWithoutMiddlewares();
    this.configureApiV1Routes();
  }

  private configureApiV1Routes() {
    const router = getApiV1Router();

    registerRoutes(router);

    this.koa.use(errorHandler);
    this.koa.use(responseTime());
    this.koa.use(requestId());
    this.koa.use(bodyParser());
    this.koa.use(helmet());
    this.koa.use(configureRequestScope);
    this.koa.use(
      authentication({
        apiUsers: getApiUsers(),
      })
    );
    this.koa.use(logRequestResponse);

    this.koa.use(router.middleware());
  }

  private configureRoutesWithoutMiddlewares() {
    this.configureHealthRouter();
  }

  private configureHealthRouter() {
    const healthRouter = getHealthRouter();

    healthRouter.get("/", (ctx) => {
      ctx.status = httpStatus.OK;
    });

    this.koa.use(healthRouter.middleware());
  }

  async listen(): Promise<void> {
    this.httpServer = await this.koa.listen(this.port);
    const env = config.get("env");
    this.logger.info(
      `Fortune Teller Backend App is running at http://localhost:${this.port} in ${env} mode`
    );
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
