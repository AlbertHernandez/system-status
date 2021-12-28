import { IncidentCreator } from "../../../../contexts/backoffice/incidents/application/create/incident-creator";
import { CreateIncidentCommandHandler } from "../../../../contexts/backoffice/incidents/application/create/create-incident-command-handler";
import { InMemoryIncidentRepository } from "../../../../contexts/backoffice/incidents/infrastructure/persistence/in-memory-incident-repository";
import {
  Container,
  DependencyInjection,
} from "../../../../contexts/shared/infrastructure/dependency-injection";
import { IncidentByIdFinder } from "../../../../contexts/backoffice/incidents/application/find-by-id/incident-by-id-finder";
import { FindIncidentByIdQueryHandler } from "../../../../contexts/backoffice/incidents/application/find-by-id/find-incident-by-id-query-handler";
import { CloseIncidentOnReportResolved } from "../../../../contexts/backoffice/incidents/application/close/close-incident-on-report-resolved";
import { IncidentCloser } from "../../../../contexts/backoffice/incidents/application/close/incident-closer";
import { IncidentReportCounterCalculator } from "../../../../contexts/backoffice/incidents/application/reports-counter-calculator/incident-report-counter-calculator";
import { CalculateReportCounterOnReportCreated } from "../../../../contexts/backoffice/incidents/application/reports-counter-calculator/calculate-report-counter-on-report-created";

export const register = (container: Container) => {
  container.register({
    incidentCreator: DependencyInjection.toolBox.asClass(IncidentCreator),
    createIncidentCommandHandler: DependencyInjection.toolBox.asClass(
      CreateIncidentCommandHandler
    ),
    findIncidentByIdQueryHandler: DependencyInjection.toolBox.asClass(
      FindIncidentByIdQueryHandler
    ),
    closeIncidentOnReportResolved: DependencyInjection.toolBox.asClass(
      CloseIncidentOnReportResolved
    ),
    incidentCloser: DependencyInjection.toolBox.asClass(IncidentCloser),
    incidentByIdFinder: DependencyInjection.toolBox.asClass(IncidentByIdFinder),
    incidentReportCounterCalculator: DependencyInjection.toolBox.asClass(
      IncidentReportCounterCalculator
    ),
    calculateReportCounterOnReportCreated: DependencyInjection.toolBox.asClass(
      CalculateReportCounterOnReportCreated
    ),
    incidentRepository: DependencyInjection.toolBox
      .asClass(InMemoryIncidentRepository)
      .singleton(),
  });
};
