import { Middleware } from "koa";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { ApiUser, UserType } from "../models/api-user";

export const authorization =
  ({ allowedUserTypes }: { allowedUserTypes: UserType[] }): Middleware =>
  async (ctx, next) => {
    const user: ApiUser | null = ctx.state.user;

    const isAllowedUser = user != null && allowedUserTypes.includes(user.type);

    if (user == null || !isAllowedUser) {
      throw new UnauthorizedError();
    }

    await next();
  };
