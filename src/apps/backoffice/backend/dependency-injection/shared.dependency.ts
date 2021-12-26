import * as Awilix from "awilix";
import camelcase from "camelcase";
import { PinoLogger } from "../../../../contexts/shared/infrastructure/pino-logger";
import { ErrorHandler } from "../../../../contexts/shared/infrastructure/error-handler";
import { config } from "../../../../contexts/backoffice/shared/infrastructure/config";
import { Class } from "../../../../contexts/shared/domain/class";
import { CreateIncidentCommandHandler } from "../../../../contexts/backoffice/incidents/application/create/create-incident-command-handler";
import { CommandHandlersInformation } from "../../../../contexts/shared/infrastructure/command-bus/in-memory/command-handlers-information";
import { InMemoryCommandBus } from "../../../../contexts/shared/infrastructure/command-bus/in-memory/in-memory-command-bus";

export const register = (container: Awilix.AwilixContainer) => {
  container.register({
    logger: Awilix.asClass(PinoLogger).inject(() => {
      return {
        level: config.get("logger.level"),
        isEnabled: config.get("logger.isEnabled"),
      };
    }),
    errorHandler: Awilix.asClass(ErrorHandler),
    commandHandlers: Awilix.asFunction(
      ({
        parentContainer,
        handlers,
      }: {
        parentContainer: Awilix.AwilixContainer;
        handlers: Class<unknown>[];
      }) =>
        handlers.map((handler) =>
          parentContainer.resolve(camelcase(handler.name))
        )
    ).inject((parentContainer: Awilix.AwilixContainer) => ({
      parentContainer,
      handlers: [CreateIncidentCommandHandler],
    })),
    commandHandlersInformation: Awilix.asClass(CommandHandlersInformation),
    commandBus: Awilix.asClass(InMemoryCommandBus),
  });
};
