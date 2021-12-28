import { Command } from "../../../../shared/domain/command";

export class CreateIncidentReportCommand extends Command {
  static readonly COMMAND_NAME = "incidentReport.create";

  readonly incidentId;
  readonly id;
  readonly message;
  readonly status;

  constructor(dependencies: {
    incidentId: string;
    id: string;
    message: string;
    status: string;
    commandId?: string;
  }) {
    super({
      commandName: CreateIncidentReportCommand.COMMAND_NAME,
      commandId: dependencies.commandId,
    });
    this.incidentId = dependencies.incidentId;
    this.id = dependencies.id;
    this.message = dependencies.message;
    this.status = dependencies.status;
  }
}
