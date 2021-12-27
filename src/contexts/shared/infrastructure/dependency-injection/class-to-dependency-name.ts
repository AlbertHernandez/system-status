import { Class } from "../../domain/class";
import { toCamelCase } from "../to-camel-case";

export const classToDependencyName = (classObject: Class<unknown>) => {
  return toCamelCase(classObject.name);
};
