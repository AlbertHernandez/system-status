import {
  Container,
  DependencyInjection,
} from "../../../../src/apps/backoffice/backend/dependency-injection/dependency-injection";

export class ContainerMother {
  static create(): Container {
    return DependencyInjection.createContainer();
  }
}
