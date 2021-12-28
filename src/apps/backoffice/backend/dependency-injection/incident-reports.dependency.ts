import {
  Container,
  DependencyInjection,
} from "../../../../contexts/shared/infrastructure/dependency-injection";
import { InMemoryIncidentReportRepository } from "../../../../contexts/backoffice/incident-reports/infrastructure/in-memory-incident-report-repository";
import { IncidentReportCreator } from "../../../../contexts/backoffice/incident-reports/application/incident-report-creator";
import { CreateIncidentReportCommandHandler } from "../../../../contexts/backoffice/incident-reports/application/create-incident-report-command-handler";

export const register = (container: Container) => {
  container.register({
    inMemoryIncidentRepository: DependencyInjection.toolBox
      .asClass(InMemoryIncidentReportRepository)
      .singleton(),
    incidentReportCreator: DependencyInjection.toolBox.asClass(
      IncidentReportCreator
    ),
    createIncidentReportCommandHandler: DependencyInjection.toolBox.asClass(
      CreateIncidentReportCommandHandler
    ),
  });
};
