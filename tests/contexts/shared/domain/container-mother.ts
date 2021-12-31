import {
  Container,
  DependencyInjection,
} from "../../../../src/contexts/shared/infrastructure/dependency-injection";
import { Class } from "../../../../src/contexts/shared/domain/class";
import { classToDependencyName } from "../../../../src/contexts/shared/infrastructure/dependency-injection/class-to-dependency-name";
import { LoggerMother } from "./logger-mother";
import { ErrorHandlerMother } from "./error-handler-mother";

export class ContainerMother {
  static create(): Container {
    return DependencyInjection.createContainer();
  }

  static withBasicInfra(): Container {
    const container = ContainerMother.create();

    const logger = LoggerMother.create();
    const errorHandler = ErrorHandlerMother.create({ logger });

    container.register({
      logger: DependencyInjection.toolBox.asValue(logger),
      errorHandler: DependencyInjection.toolBox.asValue(errorHandler),
    });

    return container;
  }

  static createRegisteringClasses(
    classesToRegister: Class<unknown>[]
  ): Container {
    const container = ContainerMother.withBasicInfra();

    classesToRegister.forEach((classToRegister) => {
      container.register({
        [classToDependencyName(classToRegister)]:
          DependencyInjection.toolBox.asClass(classToRegister),
      });
    });

    return container;
  }
}
