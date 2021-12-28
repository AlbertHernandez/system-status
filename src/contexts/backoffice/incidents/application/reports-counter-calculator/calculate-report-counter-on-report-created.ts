import { DomainEventSubscriber } from "../../../../shared/domain/domain-event-subscriber";
import { IncidentId } from "../../../shared/domain/incident-id";
import { IncidentReportCounterCalculator } from "./incident-report-counter-calculator";
import { IncidentReportCreatedDomainEvent } from "../../../incident-reports/domain/incident-report-created-domain-event";

export class CalculateReportCounterOnReportCreated
  implements DomainEventSubscriber<IncidentReportCreatedDomainEvent>
{
  private readonly calculator;

  constructor(dependencies: {
    incidentReportCounterCalculator: IncidentReportCounterCalculator;
  }) {
    this.calculator = dependencies.incidentReportCounterCalculator;
  }

  subscribedTo() {
    return [IncidentReportCreatedDomainEvent];
  }

  async on(domainEvent: IncidentReportCreatedDomainEvent): Promise<void> {
    await this.calculator.run({
      id: new IncidentId(domainEvent.incidentId),
    });
  }
}
