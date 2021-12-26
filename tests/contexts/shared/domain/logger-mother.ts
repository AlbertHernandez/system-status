import { Logger } from "../../../../src/contexts/shared/domain/logger";
import { PinoLogger } from "../../../../src/contexts/shared/infrastructure/pino-logger";

export class LoggerMother {
  static create(): Logger {
    return new PinoLogger();
  }
}
