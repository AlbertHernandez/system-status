import camelcase from "camelcase";
import {
  Container,
  DependencyInjection,
} from "../../../../src/contexts/shared/infrastructure/dependency-injection";
import { Class } from "../../../../src/contexts/shared/domain/class";

export class ContainerMother {
  static create(): Container {
    return DependencyInjection.createContainer();
  }

  static withClasses(classes: Class<unknown>[]): Container {
    const container = ContainerMother.create();

    classes.forEach((classObject) => {
      container.register({
        [camelcase(classObject.name)]:
          DependencyInjection.toolBox().asClass(classObject),
      });
    });

    return container;
  }
}
