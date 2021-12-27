import { Command } from "../../../../shared/domain/command";

export class CreateIncidentCommand extends Command {
  static readonly COMMAND_NAME = "incident.create";

  readonly id;
  readonly description;
  readonly impact;

  constructor(dependencies: {
    id: string;
    description: string;
    impact: string;
    commandId?: string;
  }) {
    super({
      commandName: CreateIncidentCommand.COMMAND_NAME,
      commandId: dependencies.commandId,
    });
    this.id = dependencies.id;
    this.description = dependencies.description;
    this.impact = dependencies.impact;
  }
}
