import Koa from "koa";
import { HttpResponse } from "../models/http-response";
import { SchemasConfig } from "../middlewares/schema-validation.middleware";
import { CommandBus } from "../../../../contexts/shared/domain/command-bus";
import { Command } from "../../../../contexts/shared/domain/command";
import { RequestContext } from "../models/request-context";
import { Logger } from "../../../../contexts/shared/domain/logger";

export abstract class Controller {
  protected readonly commandBus;
  protected readonly requestContext;
  protected readonly logger;

  constructor(dependencies: {
    commandBus: CommandBus;
    requestContext: RequestContext;
    logger: Logger;
  }) {
    this.commandBus = dependencies.commandBus;
    this.requestContext = dependencies.requestContext;
    this.logger = dependencies.logger;
  }

  async dispatch(command: Command) {
    await this.commandBus.dispatch(command);
  }

  get requestId() {
    return this.requestContext.requestId;
  }

  abstract run(ctx: Koa.Context): Promise<HttpResponse>;

  schema?(): SchemasConfig;
}
