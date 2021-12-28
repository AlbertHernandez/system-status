import { IncidentId } from "../../../shared/domain/incident-id";
import { IncidentRepository } from "../../domain/incident-repository";
import { EventBus } from "../../../../shared/domain/event-bus";
import { IncidentByIdFinder } from "../find-by-id/incident-by-id-finder";
import { QueryBus } from "../../../../shared/domain/query-bus";
import { FindIncidentReportByIncidentIdQuery } from "../../../incident-reports/application/find-by-incident-id/find-incident-report-by-incident-id-query";
import { FindIncidentReportByIncidentIdResponse } from "../../../incident-reports/application/find-by-incident-id/find-incident-report-by-incident-id-response";
import { IncidentReportsCounter } from "../../domain/incident-reports-counter";

type Payload = {
  id: IncidentId;
};

export class IncidentReportCounterCalculator {
  private readonly repository;
  private readonly eventBus;
  private readonly finder;
  private readonly queryBus;

  constructor(dependencies: {
    incidentRepository: IncidentRepository;
    eventBus: EventBus;
    queryBus: QueryBus;
    incidentByIdFinder: IncidentByIdFinder;
  }) {
    this.repository = dependencies.incidentRepository;
    this.eventBus = dependencies.eventBus;
    this.finder = dependencies.incidentByIdFinder;
    this.queryBus = dependencies.queryBus;
  }

  async run(payload: Payload) {
    const incident = await this.finder.run(payload.id);
    const reportCounter = await this.getReportCounter(payload.id);

    incident.setReportsCounter(reportCounter);

    await this.repository.save(incident);
    await this.eventBus.publish(incident.pullDomainEvents());
  }

  async getReportCounter(id: IncidentId) {
    const response =
      await this.queryBus.ask<FindIncidentReportByIncidentIdResponse>(
        new FindIncidentReportByIncidentIdQuery({
          incidentId: id.value(),
        })
      );

    return new IncidentReportsCounter(response.incidentReports.length);
  }
}
