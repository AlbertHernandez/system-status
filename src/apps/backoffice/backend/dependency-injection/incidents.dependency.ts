import * as Awilix from "awilix";
import { IncidentCreator } from "../../../../contexts/backoffice/incidents/application/create/incident-creator";
import { CreateIncidentCommandHandler } from "../../../../contexts/backoffice/incidents/application/create/create-incident-command-handler";
import { InMemoryIncidentRepository } from "../../../../contexts/backoffice/incidents/infrastructure/persistence/in-memory-incident-repository";

export const register = (container: Awilix.AwilixContainer) => {
  container.register({
    incidentCreator: Awilix.asClass(IncidentCreator),
    createIncidentCommandHandler: Awilix.asClass(CreateIncidentCommandHandler),
    incidentRepository: Awilix.asClass(InMemoryIncidentRepository),
  });
};
