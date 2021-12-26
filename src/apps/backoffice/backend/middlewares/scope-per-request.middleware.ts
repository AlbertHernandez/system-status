import Koa from "koa";
import { container } from "../dependency-injection";

export const scopePerRequest = async (ctx: Koa.Context, next: Koa.Next) => {
  ctx.state.container = container.createScope();

  await next();
};
