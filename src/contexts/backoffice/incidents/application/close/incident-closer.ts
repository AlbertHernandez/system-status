import { IncidentRepository } from "../../domain/incident-repository";
import { IncidentId } from "../../../shared/domain/incident-id";
import { EventBus } from "../../../../shared/domain/event-bus";
import { IncidentByIdFinder } from "../find-by-id/incident-by-id-finder";

type Payload = {
  id: IncidentId;
};

export class IncidentCloser {
  private readonly repository;
  private readonly eventBus;
  private readonly finder;

  constructor(dependencies: {
    incidentRepository: IncidentRepository;
    eventBus: EventBus;
    incidentByIdFinder: IncidentByIdFinder;
  }) {
    this.repository = dependencies.incidentRepository;
    this.eventBus = dependencies.eventBus;
    this.finder = dependencies.incidentByIdFinder;
  }

  async run(payload: Payload) {
    const incident = await this.finder.run(payload.id);

    incident.close();

    await this.repository.save(incident);
    await this.eventBus.publish(incident.pullDomainEvents());
  }
}
