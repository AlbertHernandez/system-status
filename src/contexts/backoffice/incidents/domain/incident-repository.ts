import { Nullable } from "../../../Shared/domain/Nullable";
import { IncidentId } from "../../shared/domain/incident-id";
import { Incident } from "./incident";

export interface IncidentRepository {
  save(incident: Incident): Promise<void>;
  search(id: IncidentId): Promise<Nullable<Incident>>;
}
