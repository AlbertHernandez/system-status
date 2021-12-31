import { Middleware } from "koa";
import { ApiUser } from "../models/api-user";

export const authentication =
  ({ apiUsers }: { apiUsers: ApiUser[] }): Middleware =>
  async (ctx, next) => {
    const apiKey = ctx.get("api-key");

    ctx.state.user = apiUsers.find((user) => user.key === apiKey) ?? null;

    await next();
  };
