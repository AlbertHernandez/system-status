import Koa from "koa";
import * as Awilix from "awilix";
import { Logger } from "../../../../contexts/shared/domain/logger";

export const scopeLoggerPerRequest = async (
  ctx: Koa.Context,
  next: Koa.Next
) => {
  const scopedContainer: Awilix.AwilixContainer = ctx.state.container;
  const logger = scopedContainer.resolve<Logger>("logger");
  const requestContext = scopedContainer.resolve("requestContext");

  const scopedLogger = logger.child(requestContext);

  scopedContainer.register({
    logger: Awilix.asValue(scopedLogger),
  });

  await next();
};
