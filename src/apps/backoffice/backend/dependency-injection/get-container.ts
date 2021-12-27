import glob from "glob";
import {
  Container,
  DependencyInjection,
} from "../../../../contexts/shared/infrastructure/dependency-injection";

const registerDependencies = (container: Container) => {
  const routes = glob.sync(__dirname + "/**/*.dependency.*");
  routes.map((route) => register(route, container));
};

const register = (routePath: string, container: Container) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const route = require(routePath);
  route.register(container);
};

export const getContainer = (): Container => {
  const container = DependencyInjection.createContainer();

  registerDependencies(container);

  return container;
};
