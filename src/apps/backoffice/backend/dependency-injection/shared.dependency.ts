import { PinoLogger } from "../../../../contexts/shared/infrastructure/pino-logger";
import { ErrorHandler } from "../../../../contexts/shared/infrastructure/error-handler";
import { config } from "../../../../contexts/backoffice/shared/infrastructure/config";
import { CreateIncidentCommandHandler } from "../../../../contexts/backoffice/incidents/application/create/create-incident-command-handler";
import { InMemoryCommandBus } from "../../../../contexts/shared/infrastructure/command-bus/in-memory/in-memory-command-bus";
import { injectInstanceOfTheClasses } from "../../../../contexts/shared/infrastructure/dependency-injection/inject-instance-of-the-classes";
import {
  Container,
  DependencyInjection,
  ScopeHandler,
} from "../../../../contexts/shared/infrastructure/dependency-injection";

export const register = (container: Container) => {
  container.register({
    container: DependencyInjection.toolBox.asValue(container),
    logger: DependencyInjection.toolBox.asClass(PinoLogger).inject(() => {
      return {
        level: config.get("logger.level"),
        isEnabled: config.get("logger.isEnabled"),
      };
    }),
    errorHandler: DependencyInjection.toolBox.asClass(ErrorHandler),
    scopeHandler: DependencyInjection.toolBox.asClass(ScopeHandler),
    commandHandlers: injectInstanceOfTheClasses([CreateIncidentCommandHandler]),
    commandBus: DependencyInjection.toolBox
      .asClass(InMemoryCommandBus)
      .singleton(),
  });
};
