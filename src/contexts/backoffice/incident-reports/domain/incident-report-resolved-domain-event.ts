import { DomainEvent } from "../../../shared/domain/domain-event";

type CreateIncidentDomainEventBody = {
  readonly eventName: string;
  readonly incidentId: string;
  readonly id: string;
  readonly message: string;
};

export class IncidentReportResolvedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "incidentReport.resolved";

  readonly incidentId: string;
  readonly message: string;

  constructor({
    incidentId,
    id,
    message,
    occurredOn,
    eventId,
  }: {
    id: string;
    incidentId: string;
    message: string;
    occurredOn?: Date;
    eventId?: string;
  }) {
    super({
      eventId,
      eventName: IncidentReportResolvedDomainEvent.EVENT_NAME,
      attributes: {
        incidentId,
        id,
        message,
      },
      occurredOn,
    });

    this.incidentId = incidentId;
    this.message = message;
  }

  toPrimitive(): CreateIncidentDomainEventBody {
    return {
      eventName: IncidentReportResolvedDomainEvent.EVENT_NAME,
      incidentId: this.incidentId,
      id: this.id,
      message: this.message,
    };
  }

  static fromPrimitives(
    body: CreateIncidentDomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new IncidentReportResolvedDomainEvent({
      incidentId: body.incidentId,
      id: body.id,
      message: body.message,
      eventId,
      occurredOn,
    });
  }
}
