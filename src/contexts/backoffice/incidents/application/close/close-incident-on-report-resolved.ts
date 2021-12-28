import { DomainEventSubscriber } from "../../../../shared/domain/domain-event-subscriber";
import { Logger } from "../../../../shared/domain/logger";
import { IncidentReportResolvedDomainEvent } from "../../../incident-reports/domain/incident-report-resolved-domain-event";
import { IncidentCloser } from "./incident-closer";
import { IncidentId } from "../../../shared/domain/incident-id";

export class CloseIncidentOnReportResolved
  implements DomainEventSubscriber<IncidentReportResolvedDomainEvent>
{
  private readonly logger;
  private readonly closer;

  constructor(dependencies: {
    logger: Logger;
    incidentCloser: IncidentCloser;
  }) {
    this.logger = dependencies.logger;
    this.closer = dependencies.incidentCloser;
  }

  subscribedTo() {
    return [IncidentReportResolvedDomainEvent];
  }

  async on(domainEvent: IncidentReportResolvedDomainEvent): Promise<void> {
    this.logger.info({
      message: "Event received",
      context: domainEvent.toPrimitive(),
    });
    await this.closer.run({
      id: new IncidentId(domainEvent.incidentId),
    });
  }
}
