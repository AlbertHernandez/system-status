import { Class } from "../../domain/class";
import { Container, DependencyInjection } from "./dependency-injection";
import { toCamelCase } from "../to-camel-case";

export const injectInstanceOfTheClasses = (classNames: Class<unknown>[]) => {
  return DependencyInjection.toolBox()
    .asFunction(
      ({
        parentContainer,
        handlers,
      }: {
        parentContainer: Container;
        handlers: Class<unknown>[];
      }) =>
        handlers.map((handler) =>
          parentContainer.resolve(toCamelCase(handler.name))
        )
    )
    .inject((parentContainer: Container) => ({
      parentContainer,
      handlers: classNames,
    }));
};
