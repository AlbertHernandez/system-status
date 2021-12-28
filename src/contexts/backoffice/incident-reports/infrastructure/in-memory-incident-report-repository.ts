import { IncidentReportRepository } from "../domain/incident-report-repository";
import { IncidentReport } from "../domain/incident-report";
import { IncidentReportId } from "../domain/incident-report-id";
import { Nullable } from "../../../shared/domain/nullable";

export class InMemoryIncidentReportRepository
  implements IncidentReportRepository
{
  private incidentReports: {
    [key: string]: {
      incidentId: string;
      id: string;
      status: string;
      message: string;
    };
  };

  constructor() {
    this.incidentReports = {};
  }

  async save(incidentReport: IncidentReport): Promise<void> {
    this.incidentReports[incidentReport.id.toString()] =
      incidentReport.toPrimitives();
  }

  async search(id: IncidentReportId): Promise<Nullable<IncidentReport>> {
    const incidentReport = this.incidentReports[id.toString()];

    return incidentReport
      ? IncidentReport.fromPrimitives(incidentReport)
      : null;
  }
}
