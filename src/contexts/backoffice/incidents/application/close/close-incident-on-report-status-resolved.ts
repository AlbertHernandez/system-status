import { DomainEventSubscriber } from "../../../../shared/domain/domain-event-subscriber";
import { IncidentReportCreatedDomainEvent } from "../../../incident-reports/domain/incident-report-created-domain-event";
import { Logger } from "../../../../shared/domain/logger";

export class CloseIncidentOnReportStatusResolved
  implements DomainEventSubscriber<IncidentReportCreatedDomainEvent>
{
  private readonly logger;

  constructor(dependencies: { logger: Logger }) {
    this.logger = dependencies.logger;
  }

  subscribedTo() {
    return [IncidentReportCreatedDomainEvent];
  }

  async on(domainEvent: IncidentReportCreatedDomainEvent): Promise<void> {
    this.logger.info({
      message: "Event received",
      context: domainEvent.toPrimitive(),
    });
  }
}
