import { Nullable } from "../../../../shared/domain/nullable";
import { Incident } from "../../domain/incident";
import { IncidentId } from "../../domain/incident-id";
import { IncidentRepository } from "../../domain/incident-repository";

export class InMemoryIncidentRepository implements IncidentRepository {
  private incidents: {
    [key: string]: {
      id: string;
      description: string;
      impact: string;
      status: string;
      creationDate: string;
      closedDate: string | null;
    };
  };

  constructor() {
    this.incidents = {};
  }

  async save(incident: Incident): Promise<void> {
    this.incidents[incident.id.toString()] = incident.toPrimitives();
  }

  async search(id: IncidentId): Promise<Nullable<Incident>> {
    const incident = this.incidents[id.toString()];

    return incident ? Incident.fromPrimitives(incident) : null;
  }
}
