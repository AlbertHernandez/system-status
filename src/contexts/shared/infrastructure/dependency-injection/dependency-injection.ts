import * as awilix from "awilix";
import { Logger } from "../../domain/logger";
import { ErrorHandler } from "../error-handler";

export type Container = awilix.AwilixContainer;

export class DependencyInjection {
  static toolBox() {
    return awilix;
  }

  static createContainer(): Container {
    return DependencyInjection.toolBox().createContainer({
      injectionMode: DependencyInjection.toolBox().InjectionMode.PROXY,
    });
  }

  static createScope(
    dependencies: {
      container?: Container;
      scopeInfo?: Record<string, unknown>;
    } = {}
  ): Container {
    const { container = DependencyInjection.createContainer(), scopeInfo } =
      dependencies;

    const scope = container.createScope();

    if (!scopeInfo) {
      return scope;
    }

    const logger = scope.resolve<Logger>("logger");

    const scopedLogger = logger.child(scopeInfo);

    const errorHandler = new ErrorHandler({
      logger: scopedLogger,
    });

    scope.register({
      logger: DependencyInjection.toolBox().asValue(scopedLogger),
      errorHandler: DependencyInjection.toolBox().asValue(errorHandler),
    });

    return scope;
  }
}
