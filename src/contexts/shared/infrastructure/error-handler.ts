import { ErrorHandler as IErrorHandler } from "../domain/error-handler";
import { BaseError } from "../domain/errors/base-error";
import { Logger } from "../domain/logger";

export class ErrorHandler implements IErrorHandler {
  private readonly logger;

  constructor(dependencies: { logger: Logger }) {
    this.logger = dependencies.logger;
  }

  async run(error: Error) {
    this.logError(error);
  }

  private logError(error: Error) {
    if (!(error instanceof BaseError)) {
      this.logger.error({
        message: error.message,
        context: {
          isOperational: false,
          code: "error.generic",
          stack: error.stack,
        },
      });
      return;
    }

    this.logger.error({
      message: error.message,
      context: {
        isOperational: error.isOperational,
        status: error.status,
        meta: error.meta,
        code: error.code,
        name: error.name,
        stack: error.stack,
      },
    });
  }
}
