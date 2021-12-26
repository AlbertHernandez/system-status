import { IncidentRepository } from "../../domain/incident-repository";
import { IncidentId } from "../../domain/incident-id";
import { IncidentDescription } from "../../domain/incident-description";
import { IncidentImpact } from "../../domain/incident-impact";
import { Incident } from "../../domain/incident";

type Payload = {
  id: IncidentId;
  description: IncidentDescription;
  impact: IncidentImpact;
};

export class IncidentCreator {
  private readonly repository;

  constructor(dependencies: { incidentRepository: IncidentRepository }) {
    this.repository = dependencies.incidentRepository;
  }

  async run(payload: Payload) {
    const incident = Incident.open({
      id: payload.id,
      description: payload.description,
      impact: payload.impact,
    });

    await this.repository.save(incident);
  }
}
