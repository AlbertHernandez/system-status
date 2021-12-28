import { Response } from "../../../../shared/domain/response";
import { PlainIncidentReport } from "../../domain/incident-report";

export class FindIncidentReportByIncidentIdResponse extends Response {
  readonly incidentReports;

  constructor(dependencies: { incidentReports: PlainIncidentReport[] }) {
    super();
    this.incidentReports = dependencies.incidentReports;
  }
}
