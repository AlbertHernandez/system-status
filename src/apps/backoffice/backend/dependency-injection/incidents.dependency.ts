import { IncidentCreator } from "../../../../contexts/backoffice/incidents/application/create/incident-creator";
import { CreateIncidentCommandHandler } from "../../../../contexts/backoffice/incidents/application/create/create-incident-command-handler";
import { InMemoryIncidentRepository } from "../../../../contexts/backoffice/incidents/infrastructure/persistence/in-memory-incident-repository";
import { Container, DependencyInjection } from "./dependency-injection";

export const register = (container: Container) => {
  container.register({
    incidentCreator: DependencyInjection.toolBox().asClass(IncidentCreator),
    createIncidentCommandHandler: DependencyInjection.toolBox().asClass(
      CreateIncidentCommandHandler
    ),
    incidentRepository: DependencyInjection.toolBox().asClass(
      InMemoryIncidentRepository
    ),
  });
};
