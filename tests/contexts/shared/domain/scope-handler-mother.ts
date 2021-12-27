import {
  Container,
  ScopeHandler,
} from "../../../../src/contexts/shared/infrastructure/dependency-injection";
import { ContainerMother } from "./container-mother";

export class ScopeHandlerMother {
  static create(): ScopeHandler {
    return new ScopeHandler({
      container: ContainerMother.create(),
    });
  }

  static createWithContainer(container: Container): ScopeHandler {
    return new ScopeHandler({
      container,
    });
  }
}
