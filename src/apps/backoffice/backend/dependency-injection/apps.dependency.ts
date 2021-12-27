import glob from "glob";
import {
  Container,
  DependencyInjection,
} from "../../../../contexts/shared/infrastructure/dependency-injection";

const registerController = (routePath: string, container: Container) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const route = require(routePath);
  const className = route.default;
  container.register({
    [className.name]: DependencyInjection.toolBox().asClass(className),
  });
};

const registerControllers = (container: Container) => {
  const routes = glob.sync(__dirname + "/../controllers/**/*.controller.*");
  routes.map((route) => registerController(route, container));
};

export const register = (container: Container) => {
  registerControllers(container);
};
