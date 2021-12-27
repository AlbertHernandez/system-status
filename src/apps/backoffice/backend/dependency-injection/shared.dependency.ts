import * as Awilix from "awilix";
import { PinoLogger } from "../../../../contexts/shared/infrastructure/pino-logger";
import { ErrorHandler } from "../../../../contexts/shared/infrastructure/error-handler";
import { config } from "../../../../contexts/backoffice/shared/infrastructure/config";
import { CreateIncidentCommandHandler } from "../../../../contexts/backoffice/incidents/application/create/create-incident-command-handler";
import { CommandHandlersInformation } from "../../../../contexts/shared/infrastructure/command-bus/in-memory/command-handlers-information";
import { InMemoryCommandBus } from "../../../../contexts/shared/infrastructure/command-bus/in-memory/in-memory-command-bus";
import { instancesOf } from "./instances-of";

export const register = (container: Awilix.AwilixContainer) => {
  container.register({
    logger: Awilix.asClass(PinoLogger).inject(() => {
      return {
        level: config.get("logger.level"),
        isEnabled: config.get("logger.isEnabled"),
      };
    }),
    errorHandler: Awilix.asClass(ErrorHandler),
    commandHandlers: instancesOf([CreateIncidentCommandHandler]),
    commandHandlersInformation: Awilix.asClass(CommandHandlersInformation),
    commandBus: Awilix.asClass(InMemoryCommandBus).singleton(),
  });
};
