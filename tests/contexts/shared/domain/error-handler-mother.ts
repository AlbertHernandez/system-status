import { ErrorHandler } from "../../../../src/contexts/shared/infrastructure/error-handler";
import { LoggerMother } from "./logger-mother";

export class ErrorHandlerMother {
  static create(): ErrorHandler {
    return new ErrorHandler({
      logger: LoggerMother.create(),
    });
  }
}
