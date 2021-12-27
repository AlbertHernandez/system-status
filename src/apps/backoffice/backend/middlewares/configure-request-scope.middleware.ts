import Koa from "koa";
import {
  DependencyInjection,
  ContainerScopeCreator,
} from "../../../../contexts/shared/infrastructure/dependency-injection";
import { container } from "../dependency-injection/container";
import { RequestContext } from "../models/request-context";

export const configureRequestScope = async (
  ctx: Koa.Context,
  next: Koa.Next
) => {
  const requestContext = new RequestContext({
    requestId: ctx.state.id,
  });

  const containerScopeCreator = container.resolve<ContainerScopeCreator>(
    "containerScopeCreator"
  );

  const scopeContainer = containerScopeCreator.run(
    requestContext.toPrimitives()
  );

  scopeContainer.register({
    requestContext: DependencyInjection.toolBox.asValue(requestContext),
  });

  ctx.state.container = scopeContainer;

  await next();
};
