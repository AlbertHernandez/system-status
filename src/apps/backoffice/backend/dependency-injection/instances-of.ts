import { Class } from "../../../../contexts/shared/domain/class";
import * as Awilix from "awilix";
import camelcase from "camelcase";

export const instancesOf = (classNames: Class<unknown>[]) => {
  return Awilix.asFunction(
    ({
      parentContainer,
      handlers,
    }: {
      parentContainer: Awilix.AwilixContainer;
      handlers: Class<unknown>[];
    }) =>
      handlers.map((handler) =>
        parentContainer.resolve(camelcase(handler.name))
      )
  ).inject((parentContainer: Awilix.AwilixContainer) => ({
    parentContainer,
    handlers: classNames,
  }));
};
