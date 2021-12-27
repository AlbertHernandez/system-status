import {
  Container,
  DependencyInjection,
} from "../../../../src/contexts/shared/infrastructure/dependency-injection";
import { Class } from "../../../../src/contexts/shared/domain/class";
import { classToDependencyName } from "../../../../src/contexts/shared/infrastructure/dependency-injection/class-to-dependency-name";

export class ContainerMother {
  static create(): Container {
    return DependencyInjection.createContainer();
  }

  static createRegisteringClasses(
    classesToRegister: Class<unknown>[]
  ): Container {
    const container = ContainerMother.create();

    classesToRegister.forEach((classToRegister) => {
      container.register({
        [classToDependencyName(classToRegister)]:
          DependencyInjection.toolBox.asClass(classToRegister),
      });
    });

    return container;
  }
}
