import { Class } from "../../domain/class";
import camelcase from "camelcase";
import { Container, DependencyInjection } from "./dependency-injection";

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
          parentContainer.resolve(camelcase(handler.name))
        )
    )
    .inject((parentContainer: Container) => ({
      parentContainer,
      handlers: classNames,
    }));
};
