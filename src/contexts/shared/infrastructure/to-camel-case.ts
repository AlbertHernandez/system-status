import camelcase from "camelcase";

export const toCamelCase = (value: string): string => {
  return camelcase(value);
};
