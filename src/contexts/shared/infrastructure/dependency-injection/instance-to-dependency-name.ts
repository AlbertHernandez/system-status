import { DependencyName } from "../../domain/dependency-name";
import { toCamelCase } from "../to-camel-case";

// eslint-disable-next-line @typescript-eslint/ban-types
const getClassName = (instance: Object) => {
  return instance.constructor.name;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const instanceToDependencyName = (instance: Object): DependencyName => {
  return toCamelCase(getClassName(instance));
};
