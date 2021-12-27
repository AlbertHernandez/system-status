import { Logger } from "../../../../src/contexts/shared/domain/logger";
import { ErrorHandler } from "../../../../src/contexts/shared/infrastructure/error-handler";
import { LoggerMother } from "./logger-mother";

export class ErrorHandlerMother {
  static create(): ErrorHandler {
    return new ErrorHandler({
      logger: LoggerMother.create(),
    });
  }

  static withLogger(logger: Logger) {
    return new ErrorHandler({
      logger,
    });
  }
}
