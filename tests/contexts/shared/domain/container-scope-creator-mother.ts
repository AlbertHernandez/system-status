import {
  Container,
  ContainerScopeCreator,
} from "../../../../src/contexts/shared/infrastructure/dependency-injection";
import { ContainerMother } from "./container-mother";

export class ContainerScopeCreatorMother {
  static create(): ContainerScopeCreator {
    return new ContainerScopeCreator({
      container: ContainerMother.create(),
    });
  }

  static createWithContainer(container: Container): ContainerScopeCreator {
    return new ContainerScopeCreator({
      container,
    });
  }
}
