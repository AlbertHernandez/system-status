import * as awilix from "awilix";
import { getContainer } from "./get-container";
import { Logger } from "../../../../contexts/shared/domain/logger";
import { ErrorHandler } from "../../../../contexts/shared/infrastructure/error-handler";
import { classToInstanceName } from "./class-to-instance-name";

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
      scopeInfo?: Record<string, unknown>;
    } = {}
  ): Container {
    const scope = getContainer().createScope();

    if (!dependencies.scopeInfo) {
      return scope;
    }

    const logger = scope.resolve<Logger>("logger");

    const scopedLogger = logger.child(dependencies.scopeInfo);

    const errorHandler = new ErrorHandler({
      logger: scopedLogger,
    });

    scope.register({
      logger: DependencyInjection.toolBox().asValue(scopedLogger),
      errorHandler: DependencyInjection.toolBox().asValue(errorHandler),
    });

    return scope;
  }

  static resolveInstanceForClass(
    // eslint-disable-next-line @typescript-eslint/ban-types
    classToResolve: Object,
    options: {
      parentContainer?: Container;
    }
  ) {
    const instanceName = classToInstanceName(classToResolve);
    if (options.parentContainer) {
      return options.parentContainer.resolve(instanceName);
    }

    return getContainer().resolve(instanceName);
  }
}
