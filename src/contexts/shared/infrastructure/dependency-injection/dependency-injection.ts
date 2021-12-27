import * as awilix from "awilix";

export type Container = awilix.AwilixContainer;

export class DependencyInjection {
  static get toolBox() {
    return awilix;
  }

  static createContainer(): Container {
    return DependencyInjection.toolBox.createContainer({
      injectionMode: DependencyInjection.toolBox.InjectionMode.PROXY,
    });
  }
}
