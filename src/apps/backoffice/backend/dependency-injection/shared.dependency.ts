import { PinoLogger } from "../../../../contexts/shared/infrastructure/pino-logger";
import { ErrorHandler } from "../../../../contexts/shared/infrastructure/error-handler";
import { config } from "../../../../contexts/backoffice/shared/infrastructure/config";
import { CreateIncidentCommandHandler } from "../../../../contexts/backoffice/incidents/application/create/create-incident-command-handler";
import { InMemoryCommandBus } from "../../../../contexts/shared/infrastructure/command-bus/in-memory/in-memory-command-bus";
import { injectInstanceOfTheClasses } from "../../../../contexts/shared/infrastructure/dependency-injection/inject-instance-of-the-classes";
import {
  Container,
  DependencyInjection,
  ContainerScopeCreator,
} from "../../../../contexts/shared/infrastructure/dependency-injection";
import { InMemoryQueryBus } from "../../../../contexts/shared/infrastructure/query-bus/in-memory/in-memory-query-bus";
import { FindIncidentByIdQueryHandler } from "../../../../contexts/backoffice/incidents/application/find-by-id/find-incident-by-id-query-handler";
import { CreateIncidentReportCommandHandler } from "../../../../contexts/backoffice/incident-reports/application/create/create-incident-report-command-handler";
import { FindIncidentReportByIdQueryHandler } from "../../../../contexts/backoffice/incident-reports/application/find-by-id/find-incident-report-by-id-query-handler";
import { InMemoryAsyncEventBus } from "../../../../contexts/shared/infrastructure/event-bus/in-memory-async-event-bus";
import { CloseIncidentOnReportStatusResolved } from "../../../../contexts/backoffice/incidents/application/close/close-incident-on-report-status-resolved";

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
    containerScopeCreator: DependencyInjection.toolBox.asClass(
      ContainerScopeCreator
    ),
    commandHandlers: injectInstanceOfTheClasses([
      CreateIncidentCommandHandler,
      CreateIncidentReportCommandHandler,
    ]),
    queryHandlers: injectInstanceOfTheClasses([
      FindIncidentByIdQueryHandler,
      FindIncidentReportByIdQueryHandler,
    ]),
    commandBus: DependencyInjection.toolBox
      .asClass(InMemoryCommandBus)
      .singleton(),
    queryBus: DependencyInjection.toolBox.asClass(InMemoryQueryBus).singleton(),
    eventBus: DependencyInjection.toolBox
      .asClass(InMemoryAsyncEventBus)
      .singleton(),
    domainEventSubscribers: injectInstanceOfTheClasses([
      CloseIncidentOnReportStatusResolved,
    ]),
  });
};
