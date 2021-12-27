import { Class } from "../../domain/class";
import { Container, DependencyInjection } from "./dependency-injection";
import { classToDependencyName } from "./class-to-dependency-name";

export const injectInstanceOfTheClasses = (classNames: Class<unknown>[]) => {
  return DependencyInjection.toolBox
    .asFunction(
      ({
        parentContainer,
        handlers,
      }: {
        parentContainer: Container;
        handlers: Class<unknown>[];
      }) =>
        handlers.map((handler) =>
          parentContainer.resolve(classToDependencyName(handler))
        )
    )
    .inject((parentContainer: Container) => ({
      parentContainer,
      handlers: classNames,
    }));
};
