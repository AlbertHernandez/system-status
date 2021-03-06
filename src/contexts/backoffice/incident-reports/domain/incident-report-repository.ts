import { Nullable } from "../../../Shared/domain/Nullable";
import { IncidentReport } from "./incident-report";
import { IncidentReportId } from "./incident-report-id";
import { IncidentId } from "../../shared/domain/incident-id";

export interface IncidentReportRepository {
  save(incidentReport: IncidentReport): Promise<void>;
  search(id: IncidentReportId): Promise<Nullable<IncidentReport>>;
  searchByIncidentId(incidentId: IncidentId): Promise<Array<IncidentReport>>;
}
