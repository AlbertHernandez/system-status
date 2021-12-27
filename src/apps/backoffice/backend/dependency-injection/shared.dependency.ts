import { PinoLogger } from "../../../../contexts/shared/infrastructure/pino-logger";
import { ErrorHandler } from "../../../../contexts/shared/infrastructure/error-handler";
import { config } from "../../../../contexts/backoffice/shared/infrastructure/config";
import { CreateIncidentCommandHandler } from "../../../../contexts/backoffice/incidents/application/create/create-incident-command-handler";
import { CommandHandlersInformation } from "../../../../contexts/shared/infrastructure/command-bus/in-memory/command-handlers-information";
import { InMemoryCommandBus } from "../../../../contexts/shared/infrastructure/command-bus/in-memory/in-memory-command-bus";
import { injectInstanceOfTheClasses } from "./inject-instance-of-the-classes";
import { Container, DependencyInjection } from "./dependency-injection";
import { ScopeHandler } from "./scope-handler";
import { asClass } from "awilix";

export const register = (container: Container) => {
  container.register({
    container: DependencyInjection.toolBox().asValue(container),
    logger: DependencyInjection.toolBox()
      .asClass(PinoLogger)
      .inject(() => {
        return {
          level: config.get("logger.level"),
          isEnabled: config.get("logger.isEnabled"),
        };
      }),
    errorHandler: DependencyInjection.toolBox().asClass(ErrorHandler),
    scopeHandler: asClass(ScopeHandler),
    commandHandlers: injectInstanceOfTheClasses([CreateIncidentCommandHandler]),
    commandHandlersInformation: DependencyInjection.toolBox().asClass(
      CommandHandlersInformation
    ),
    commandBus: DependencyInjection.toolBox()
      .asClass(InMemoryCommandBus)
      .singleton(),
  });
};
