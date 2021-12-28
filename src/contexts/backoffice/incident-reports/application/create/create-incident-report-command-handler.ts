import { CommandHandler } from "../../../../shared/domain/command-handler";
import { IncidentId } from "../../../shared/domain/incident-id";
import { CreateIncidentReportCommand } from "./create-incident-report-command";
import { IncidentReportCreator } from "./incident-report-creator";
import { IncidentReportId } from "../../domain/incident-report-id";
import { IncidentReportMessage } from "../../domain/incident-report-message";
import { IncidentReportStatus } from "../../domain/incident-report-status";

export class CreateIncidentReportCommandHandler
  implements CommandHandler<CreateIncidentReportCommand>
{
  private readonly incidentReportCreator;

  constructor(dependencies: { incidentReportCreator: IncidentReportCreator }) {
    this.incidentReportCreator = dependencies.incidentReportCreator;
  }

  subscribedTo() {
    return CreateIncidentReportCommand;
  }

  async handle(command: CreateIncidentReportCommand): Promise<void> {
    await this.incidentReportCreator.run({
      incidentId: new IncidentId(command.incidentId),
      id: new IncidentReportId(command.id),
      message: new IncidentReportMessage(command.message),
      status: IncidentReportStatus.fromValue(command.status),
    });
  }
}
