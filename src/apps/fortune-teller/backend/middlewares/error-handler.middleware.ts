import httpStatus from "http-status";
import Koa from "koa";
import { BaseError } from "../../../../contexts/shared/domain/errors/base-error";
import { ErrorHandler } from "../../../../contexts/shared/domain/error-handler";

const INTERNAL_SERVER_ERROR = "Internal Server Error";

export const errorHandler = async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    await next().catch(async (error: Error | BaseError) => {
      const errorHandler: ErrorHandler =
        ctx.state.container.resolve("errorHandler");

      await errorHandler.run(error);

      if (!(error instanceof BaseError)) {
        throw error;
      }

      const isClientError = Boolean(error.status?.toString().startsWith("4"));

      if (!isClientError) {
        throw error;
      }

      ctx.status = error.status || httpStatus.INTERNAL_SERVER_ERROR;
      ctx.body = {
        error: {
          message: error.message,
          meta: error.meta,
        },
      };
    });
  } catch (error) {
    ctx.body = {
      error: {
        message: INTERNAL_SERVER_ERROR,
      },
    };
    ctx.status = httpStatus.INTERNAL_SERVER_ERROR;
  }
};
