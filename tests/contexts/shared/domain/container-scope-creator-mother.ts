import {
  Container,
  ContainerScopeCreator,
} from "../../../../src/contexts/shared/infrastructure/dependency-injection";
import { ContainerMother } from "./container-mother";

export class ContainerScopeCreatorMother {
  static create({
    container = ContainerMother.create(),
  }: {
    container?: Container;
  } = {}): ContainerScopeCreator {
    return new ContainerScopeCreator({
      container,
    });
  }
}
