import Koa from "koa";
import { Logger } from "../../../../contexts/shared/domain/logger";

export const logRequestResponse = async (ctx: Koa.Context, next: Koa.Next) => {
  const logger: Logger = ctx.state.container.resolve("logger");
  const commonHttpRequest = {
    requestMethod: ctx.request.method,
    requestUrl: ctx.url,
    userAgent: ctx.headers["user-agent"],
    protocol: ctx.protocol,
    remoteIp: ctx.request.ip,
  };

  try {
    logger.info({
      message: "Incoming Request",
      context: {
        header: ctx.header,
        body: ctx.request.body,
      },
      httpRequest: commonHttpRequest,
    });
    await next();
  } finally {
    logger.info({
      message: "Finishing Request",
      context: {
        body: ctx.body,
      },
      httpRequest: { ...commonHttpRequest, status: ctx.status },
    });
  }
};
