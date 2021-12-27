import * as awilix from "awilix";
import { Logger } from "../../domain/logger";
import { Nullable } from "../../domain/nullable";
import { ErrorHandler } from "../error-handler";
import { Container } from "./dependency-injection";

export class ScopeHandler {
  private readonly container;

  constructor(dependencies: { container: Container }) {
    this.container = dependencies.container;
  }

  createScope(scopeInfo?: Record<string, unknown>): Container {
    const scope = this.container.createScope();

    if (!scopeInfo) {
      return scope;
    }

    const logger = scope.resolve<Nullable<Logger>>("logger", {
      allowUnregistered: true,
    });

    if (logger) {
      const scopedLogger = logger.child(scopeInfo);

      const errorHandler = new ErrorHandler({
        logger: scopedLogger,
      });

      scope.register({
        logger: awilix.asValue(scopedLogger),
        errorHandler: awilix.asValue(errorHandler),
      });
    }

    return scope;
  }
}
