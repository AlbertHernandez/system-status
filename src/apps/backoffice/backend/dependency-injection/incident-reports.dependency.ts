import {
  Container,
  DependencyInjection,
} from "../../../../contexts/shared/infrastructure/dependency-injection";
import { InMemoryIncidentReportRepository } from "../../../../contexts/backoffice/incident-reports/infrastructure/in-memory-incident-report-repository";
import { IncidentReportCreator } from "../../../../contexts/backoffice/incident-reports/application/create/incident-report-creator";
import { CreateIncidentReportCommandHandler } from "../../../../contexts/backoffice/incident-reports/application/create/create-incident-report-command-handler";
import { IncidentReportByIdFinder } from "../../../../contexts/backoffice/incident-reports/application/find-by-id/incident-report-by-id-finder";
import { FindIncidentReportByIdQueryHandler } from "../../../../contexts/backoffice/incident-reports/application/find-by-id/find-incident-report-by-id-query-handler";

export const register = (container: Container) => {
  container.register({
    incidentReportRepository: DependencyInjection.toolBox
      .asClass(InMemoryIncidentReportRepository)
      .singleton(),
    incidentReportCreator: DependencyInjection.toolBox.asClass(
      IncidentReportCreator
    ),
    incidentReportByIdFinder: DependencyInjection.toolBox.asClass(
      IncidentReportByIdFinder
    ),
    createIncidentReportCommandHandler: DependencyInjection.toolBox.asClass(
      CreateIncidentReportCommandHandler
    ),
    findIncidentReportByIdQueryHandler: DependencyInjection.toolBox.asClass(
      FindIncidentReportByIdQueryHandler
    ),
  });
};
