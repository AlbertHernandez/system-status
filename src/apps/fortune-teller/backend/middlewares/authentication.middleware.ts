import Koa from "koa";
import { ApiUser } from "../models/api-user";

export const authentication =
  ({ apiUsers }: { apiUsers: ApiUser[] }) =>
  async (ctx: Koa.Context, next: Koa.Next) => {
    const apiKey = ctx.get("api-key");

    ctx.state.user = apiUsers.find((user) => user.key === apiKey) ?? null;

    await next();
  };
