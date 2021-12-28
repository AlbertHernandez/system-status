import { IncidentCreator } from "../../../../contexts/backoffice/incidents/application/create/incident-creator";
import { CreateIncidentCommandHandler } from "../../../../contexts/backoffice/incidents/application/create/create-incident-command-handler";
import { InMemoryIncidentRepository } from "../../../../contexts/backoffice/incidents/infrastructure/persistence/in-memory-incident-repository";
import {
  Container,
  DependencyInjection,
} from "../../../../contexts/shared/infrastructure/dependency-injection";
import { IncidentByIdFinder } from "../../../../contexts/backoffice/incidents/application/find-by-id/incident-by-id-finder";
import { FindIncidentByIdQueryHandler } from "../../../../contexts/backoffice/incidents/application/find-by-id/find-incident-by-id-query-handler";
import { CloseIncidentOnReportStatusResolved } from "../../../../contexts/backoffice/incidents/application/close/close-incident-on-report-status-resolved";

export const register = (container: Container) => {
  container.register({
    incidentCreator: DependencyInjection.toolBox.asClass(IncidentCreator),
    createIncidentCommandHandler: DependencyInjection.toolBox.asClass(
      CreateIncidentCommandHandler
    ),
    findIncidentByIdQueryHandler: DependencyInjection.toolBox.asClass(
      FindIncidentByIdQueryHandler
    ),
    closeIncidentOnReportStatusResolved: DependencyInjection.toolBox.asClass(
      CloseIncidentOnReportStatusResolved
    ),
    incidentByIdFinder: DependencyInjection.toolBox.asClass(IncidentByIdFinder),
    incidentRepository: DependencyInjection.toolBox
      .asClass(InMemoryIncidentRepository)
      .singleton(),
  });
};
