import { IncidentReportRepository } from "../../domain/incident-report-repository";
import { IncidentReport } from "../../domain/incident-report";
import { IncidentReportId } from "../../domain/incident-report-id";
import { IncidentId } from "../../../shared/domain/incident-id";
import { FindIncidentByIdQuery } from "../../../incidents/application/find-by-id/find-incident-by-id-query";
import { QueryBus } from "../../../../shared/domain/query-bus";

export class IncidentReportByIncidentIdFinder {
  private readonly repository;
  private readonly queryBus;

  constructor(dependencies: {
    incidentReportRepository: IncidentReportRepository;
    queryBus: QueryBus;
  }) {
    this.repository = dependencies.incidentReportRepository;
    this.queryBus = dependencies.queryBus;
  }

  async run(incidentReportId: IncidentReportId): Promise<IncidentReport[]> {
    await this.ensureIncidentExist(incidentReportId);
    return await this.repository.searchByIncidentId(incidentReportId);
  }

  private async ensureIncidentExist(incidentId: IncidentId) {
    await this.queryBus.ask(
      new FindIncidentByIdQuery({
        id: incidentId.toString(),
      })
    );
  }
}
