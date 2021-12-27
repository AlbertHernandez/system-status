import { DependencyName } from "../../domain/dependency-name";
import { toCamelCase } from "../to-camel-case";
import { Instance } from "../../domain/instance";

const getClassName = (instance: Instance) => {
  return instance.constructor.name;
};

export const instanceToDependencyName = (
  instance: Instance
): DependencyName => {
  return toCamelCase(getClassName(instance));
};
