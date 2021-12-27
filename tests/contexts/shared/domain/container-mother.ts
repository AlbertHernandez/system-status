import {
  Container,
  DependencyInjection,
} from "../../../../src/contexts/shared/infrastructure/dependency-injection";
import { Class } from "../../../../src/contexts/shared/domain/class";
import { toCamelCase } from "../../../../src/contexts/shared/infrastructure/to-camel-case";

export class ContainerMother {
  static create(): Container {
    return DependencyInjection.createContainer();
  }

  static withClasses(classes: Class<unknown>[]): Container {
    const container = ContainerMother.create();

    classes.forEach((classObject) => {
      container.register({
        [toCamelCase(classObject.name)]:
          DependencyInjection.toolBox().asClass(classObject),
      });
    });

    return container;
  }
}
