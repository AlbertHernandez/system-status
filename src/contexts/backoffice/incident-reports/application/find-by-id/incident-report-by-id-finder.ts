import { IncidentReportRepository } from "../../domain/incident-report-repository";
import { IncidentReport } from "../../domain/incident-report";
import { IncidentReportId } from "../../domain/incident-report-id";
import { IncidentReportNotFoundError } from "../../domain/incident-report-not-found-error";

export class IncidentReportByIdFinder {
  private readonly repository;

  constructor(dependencies: {
    incidentReportRepository: IncidentReportRepository;
  }) {
    this.repository = dependencies.incidentReportRepository;
  }

  async run(incidentReportId: IncidentReportId): Promise<IncidentReport> {
    const incidentReport = await this.repository.search(incidentReportId);

    if (!incidentReport) {
      throw new IncidentReportNotFoundError({
        id: incidentReportId.toString(),
      });
    }

    return incidentReport;
  }
}
