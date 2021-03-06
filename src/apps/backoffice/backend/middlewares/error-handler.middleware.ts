import httpStatus from "http-status";
import { Middleware } from "koa";
import { BaseError } from "../../../../contexts/shared/domain/errors/base-error";
import { ErrorHandler } from "../../../../contexts/shared/domain/error-handler";
import { HttpError } from "../errors/http-error";

const INTERNAL_SERVER_ERROR = "Internal Server Error";

export const errorHandler: Middleware = async (ctx, next) => {
  try {
    await next().catch(async (error: Error | BaseError) => {
      const errorHandler: ErrorHandler =
        ctx.state.container.resolve("errorHandler");

      await errorHandler.run(error);

      if (!(error instanceof BaseError)) {
        throw error;
      }

      const errorStatus =
        error instanceof HttpError ? error.status : ctx.status;

      const isClientError = Boolean(errorStatus.toString().startsWith("4"));

      if (!isClientError) {
        throw error;
      }

      ctx.status = errorStatus;
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
