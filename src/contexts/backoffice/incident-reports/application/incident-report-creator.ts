import { IncidentReportRepository } from "../domain/incident-report-repository";
import { IncidentId } from "../../shared/domain/incident-id";
import { IncidentReportId } from "../domain/incident-report-id";
import { IncidentReportMessage } from "../domain/incident-report-message";
import { IncidentReportStatus } from "../domain/incident-report-status";
import { IncidentReport } from "../domain/incident-report";
import { QueryBus } from "../../../shared/domain/query-bus";
import { FindIncidentByIdQuery } from "../../incidents/application/find-by-id/find-incident-by-id-query";

type Payload = {
  incidentId: IncidentId;
  id: IncidentReportId;
  message: IncidentReportMessage;
  status: IncidentReportStatus;
};

export class IncidentReportCreator {
  private readonly repository;
  private readonly queryBus;

  constructor(dependencies: {
    incidentRepository: IncidentReportRepository;
    queryBus: QueryBus;
  }) {
    this.repository = dependencies.incidentRepository;
    this.queryBus = dependencies.queryBus;
  }

  async run(payload: Payload) {
    await this.ensureIncidentExist(payload.incidentId);

    const incident = IncidentReport.create({
      incidentId: payload.incidentId,
      id: payload.id,
      message: payload.message,
      status: payload.status,
    });

    await this.repository.save(incident);
  }

  private async ensureIncidentExist(incidentId: IncidentId) {
    await this.queryBus.ask(
      new FindIncidentByIdQuery({
        id: incidentId.toString(),
      })
    );
  }
}
