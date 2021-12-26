import { Command } from "../../../../shared/domain/command";

export class CreateIncidentCommand extends Command {
  readonly id;
  readonly description;
  readonly impact;

  constructor(dependencies: {
    id: string;
    description: string;
    impact: string;
  }) {
    super();
    this.id = dependencies.id;
    this.description = dependencies.description;
    this.impact = dependencies.impact;
  }
}
