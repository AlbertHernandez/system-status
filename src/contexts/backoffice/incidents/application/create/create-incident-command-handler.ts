import { Command } from "../../../../shared/domain/command";
import { IncidentCreator } from "./incident-creator";
import { CreateIncidentCommand } from "./create-incident-command";
import { CommandHandler } from "../../../../shared/domain/command-handler";
import { IncidentId } from "../../domain/incident-id";
import { IncidentImpact } from "../../domain/incident-impact";
import { IncidentDescription } from "../../domain/incident-description";

export class CreateIncidentCommandHandler
  implements CommandHandler<CreateIncidentCommand>
{
  private readonly incidentCreator;

  constructor(dependencies: { incidentCreator: IncidentCreator }) {
    this.incidentCreator = dependencies.incidentCreator;
  }

  subscribedTo(): Command {
    return CreateIncidentCommand;
  }

  async handle(command: CreateIncidentCommand): Promise<void> {
    await this.incidentCreator.run({
      id: new IncidentId(command.id),
      description: new IncidentDescription(command.description),
      impact: IncidentImpact.fromValue(command.impact),
    });
  }
}
