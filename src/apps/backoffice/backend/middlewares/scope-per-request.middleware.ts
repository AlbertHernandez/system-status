import Koa from "koa";
import { createScope } from "../dependency-injection/create-scope";

export const scopePerRequest = async (ctx: Koa.Context, next: Koa.Next) => {
  ctx.state.container = createScope();

  await next();
};
