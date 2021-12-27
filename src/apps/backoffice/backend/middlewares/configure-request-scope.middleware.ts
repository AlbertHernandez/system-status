import Koa from "koa";
import { DependencyInjection } from "../dependency-injection/dependency-injection";
import { RequestContext } from "../models/request-context";

export const configureRequestScope = async (
  ctx: Koa.Context,
  next: Koa.Next
) => {
  const requestContext = new RequestContext({
    requestId: ctx.state.id,
  });

  const scopeContainer = DependencyInjection.createScope({
    scopeInfo: requestContext.toPrimitives(),
  });

  scopeContainer.register({
    requestContext: DependencyInjection.toolBox().asValue(requestContext),
  });

  ctx.state.container = scopeContainer;

  await next();
};
