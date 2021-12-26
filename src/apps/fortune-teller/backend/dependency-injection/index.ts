import * as Awilix from "awilix";
import glob from "glob";

const registerDependencies = (container: Awilix.AwilixContainer) => {
  const routes = glob.sync(__dirname + "/**/*.dependency.*");
  routes.map((route) => register(route, container));
};

const register = (routePath: string, container: Awilix.AwilixContainer) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const route = require(routePath);
  route.register(container);
};

const container = Awilix.createContainer({
  injectionMode: Awilix.InjectionMode.PROXY,
});

registerDependencies(container);

export { container };
