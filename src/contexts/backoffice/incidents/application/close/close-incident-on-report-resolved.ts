import { DomainEventSubscriber } from "../../../../shared/domain/domain-event-subscriber";
import { Logger } from "../../../../shared/domain/logger";
import { IncidentReportResolvedDomainEvent } from "../../../incident-reports/domain/incident-report-resolved-domain-event";

export class CloseIncidentOnReportResolved
  implements DomainEventSubscriber<IncidentReportResolvedDomainEvent>
{
  private readonly logger;

  constructor(dependencies: { logger: Logger }) {
    this.logger = dependencies.logger;
  }

  subscribedTo() {
    return [IncidentReportResolvedDomainEvent];
  }

  async on(domainEvent: IncidentReportResolvedDomainEvent): Promise<void> {
    this.logger.info({
      message: "Event received",
      context: domainEvent.toPrimitive(),
    });
  }
}
