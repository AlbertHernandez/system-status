import { IncidentRepository } from "../../domain/incident-repository";
import { Incident } from "../../domain/incident";
import { IncidentId } from "../../domain/incident-id";
import { IncidentNotFoundError } from "../../domain/incident-not-found-error";

export class IncidentByIdFinder {
  private readonly repository;

  constructor(dependencies: { incidentRepository: IncidentRepository }) {
    this.repository = dependencies.incidentRepository;
  }

  async run(incidentId: IncidentId): Promise<Incident> {
    const incident = await this.repository.search(incidentId);

    if (!incident) {
      throw new IncidentNotFoundError({
        id: incidentId.toString(),
      });
    }

    return incident;
  }
}
