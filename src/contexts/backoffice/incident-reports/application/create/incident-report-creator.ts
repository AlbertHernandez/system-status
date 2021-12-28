import { IncidentReportRepository } from "../../domain/incident-report-repository";
import { IncidentId } from "../../../shared/domain/incident-id";
import { IncidentReportId } from "../../domain/incident-report-id";
import { IncidentReportMessage } from "../../domain/incident-report-message";
import { IncidentReportStatus } from "../../domain/incident-report-status";
import { IncidentReport } from "../../domain/incident-report";
import { QueryBus } from "../../../../shared/domain/query-bus";
import { FindIncidentByIdQuery } from "../../../incidents/application/find-by-id/find-incident-by-id-query";
import { EventBus } from "../../../../shared/domain/event-bus";

type Payload = {
  incidentId: IncidentId;
  id: IncidentReportId;
  message: IncidentReportMessage;
  status: IncidentReportStatus;
};

export class IncidentReportCreator {
  private readonly repository;
  private readonly queryBus;
  private readonly eventBus;

  constructor(dependencies: {
    incidentReportRepository: IncidentReportRepository;
    queryBus: QueryBus;
    eventBus: EventBus;
  }) {
    this.repository = dependencies.incidentReportRepository;
    this.queryBus = dependencies.queryBus;
    this.eventBus = dependencies.eventBus;
  }

  async run(payload: Payload) {
    await this.ensureIncidentExist(payload.incidentId);

    const incidentReport = IncidentReport.create({
      incidentId: payload.incidentId,
      id: payload.id,
      message: payload.message,
      status: payload.status,
    });

    await this.repository.save(incidentReport);
    await this.eventBus.publish(incidentReport.pullDomainEvents());
  }

  private async ensureIncidentExist(incidentId: IncidentId) {
    await this.queryBus.ask(
      new FindIncidentByIdQuery({
        id: incidentId.toString(),
      })
    );
  }
}
