import { IncidentRepository } from "../../domain/incident-repository";
import { IncidentId } from "../../../shared/domain/incident-id";
import { IncidentDescription } from "../../domain/incident-description";
import { IncidentImpact } from "../../domain/incident-impact";
import { Incident } from "../../domain/incident";
import { EventBus } from "../../../../shared/domain/event-bus";

type Payload = {
  id: IncidentId;
  description: IncidentDescription;
  impact: IncidentImpact;
};

export class IncidentCreator {
  private readonly repository;
  private readonly eventBus;

  constructor(dependencies: {
    incidentRepository: IncidentRepository;
    eventBus: EventBus;
  }) {
    this.repository = dependencies.incidentRepository;
    this.eventBus = dependencies.eventBus;
  }

  async run(payload: Payload) {
    const incident = Incident.open({
      id: payload.id,
      description: payload.description,
      impact: payload.impact,
    });

    await this.repository.save(incident);
    await this.eventBus.publish(incident.pullDomainEvents());
  }
}
