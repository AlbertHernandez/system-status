import { DomainEvent } from "../../../shared/domain/domain-event";

type CreateIncidentDomainEventBody = {
  readonly eventName: string;
  readonly incidentId: string;
  readonly id: string;
  readonly message: string;
  readonly status: string;
};

export class IncidentReportCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "incidentReport.created";

  readonly incidentId: string;
  readonly message: string;
  readonly status: string;

  constructor({
    incidentId,
    id,
    message,
    status,
    occurredOn,
    eventId,
  }: {
    id: string;
    incidentId: string;
    message: string;
    status: string;
    occurredOn?: Date;
    eventId?: string;
  }) {
    super({
      eventId,
      eventName: IncidentReportCreatedDomainEvent.EVENT_NAME,
      attributes: {
        incidentId,
        id,
        message,
        status,
      },
      occurredOn,
    });

    this.incidentId = incidentId;
    this.message = message;
    this.status = status;
  }

  toPrimitive(): CreateIncidentDomainEventBody {
    return {
      eventName: IncidentReportCreatedDomainEvent.EVENT_NAME,
      incidentId: this.incidentId,
      id: this.id,
      message: this.message,
      status: this.status,
    };
  }

  static fromPrimitives(
    body: CreateIncidentDomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new IncidentReportCreatedDomainEvent({
      incidentId: body.incidentId,
      id: body.id,
      message: body.message,
      status: body.status,
      eventId,
      occurredOn,
    });
  }
}
