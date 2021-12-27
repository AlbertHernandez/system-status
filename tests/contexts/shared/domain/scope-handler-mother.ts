import { ScopeHandler } from "../../../../src/apps/backoffice/backend/dependency-injection/scope-handler";
import { ContainerMother } from "./container-mother";
import { Container } from "../../../../src/apps/backoffice/backend/dependency-injection/dependency-injection";

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
