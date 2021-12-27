import {
  Container,
  DependencyInjection,
} from "../../../../src/contexts/shared/infrastructure/dependency-injection";

export class ContainerMother {
  static create(): Container {
    return DependencyInjection.createContainer();
  }
}
