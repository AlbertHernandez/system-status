import { IncidentRepository } from "../../domain/incident-repository";
import { IncidentId } from "../../domain/incident-id";
import { IncidentDescription } from "../../domain/incident-description";
import { IncidentImpact } from "../../domain/incident-impact";
import { Incident } from "../../domain/incident";
import { Logger } from "../../../../shared/domain/logger";

type Payload = {
  id: IncidentId;
  description: IncidentDescription;
  impact: IncidentImpact;
};

export class IncidentCreator {
  private readonly repository;
  private readonly logger;

  constructor(dependencies: {
    incidentRepository: IncidentRepository;
    logger: Logger;
  }) {
    this.repository = dependencies.incidentRepository;
    this.logger = dependencies.logger;
  }

  async run(payload: Payload) {
    this.logger.info("Hello!");
    const incident = Incident.open({
      id: payload.id,
      description: payload.description,
      impact: payload.impact,
    });

    await this.repository.save(incident);
  }
}
