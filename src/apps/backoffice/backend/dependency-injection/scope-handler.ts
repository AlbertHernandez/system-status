import * as awilix from "awilix";
import { Logger } from "../../../../contexts/shared/domain/logger";
import { Nullable } from "../../../../contexts/Shared/domain/Nullable";
import { ErrorHandler } from "../../../../contexts/shared/infrastructure/error-handler";
import { Container } from "./dependency-injection";

export class ScopeHandler {
  private readonly container;

  constructor(dependencies: { container: Container }) {
    this.container = dependencies.container;
  }

  createScope(
    dependencies: {
      scopeInfo?: Record<string, unknown>;
    } = {}
  ): Container {
    const scope = this.container.createScope();

    if (!dependencies.scopeInfo) {
      return scope;
    }

    const logger = scope.resolve<Nullable<Logger>>("logger", {
      allowUnregistered: true,
    });

    if (logger) {
      const scopedLogger = logger.child(dependencies.scopeInfo);

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
