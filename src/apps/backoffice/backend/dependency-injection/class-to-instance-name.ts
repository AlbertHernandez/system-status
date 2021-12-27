import camelcase from "camelcase";

// eslint-disable-next-line @typescript-eslint/ban-types
export const classToInstanceName = (classToResolve: Object) => {
  return camelcase(classToResolve.constructor.name);
};
