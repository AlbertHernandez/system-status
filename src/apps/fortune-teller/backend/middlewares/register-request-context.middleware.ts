import Koa from "koa";
import * as Awilix from "awilix";

export const registerRequestContext = async (
  ctx: Koa.Context,
  next: Koa.Next
) => {
  const requestId = ctx.state.id;

  const requestContext = {
    requestId,
  };

  const scopedContainer: Awilix.AwilixContainer = ctx.state.container;

  scopedContainer.register({
    requestContext: Awilix.asValue(requestContext),
  });

  await next();
};
