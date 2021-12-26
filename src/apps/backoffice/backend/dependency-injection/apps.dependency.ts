import * as Awilix from "awilix";
import glob from "glob";

const registerController = (
  routePath: string,
  container: Awilix.AwilixContainer
) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const route = require(routePath);
  const className = route.default;
  container.register({
    [className.name]: Awilix.asClass(className),
  });
};

const registerControllers = (container: Awilix.AwilixContainer) => {
  const routes = glob.sync(__dirname + "/../controllers/**/*.controller.*");
  routes.map((route) => registerController(route, container));
};

export const register = (container: Awilix.AwilixContainer) => {
  registerControllers(container);
};
