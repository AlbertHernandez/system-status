import { AwilixContainer } from "awilix";
import { container } from "./index";

export const createScope = (): AwilixContainer => {
  return container.createScope();
};
