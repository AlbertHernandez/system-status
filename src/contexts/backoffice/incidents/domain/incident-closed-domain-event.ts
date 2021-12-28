import { DomainEvent } from "../../../shared/domain/domain-event";

type CloseIncidentDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly description: string;
  readonly impact: string;
  readonly status: string;
  readonly creationDate: string;
  readonly closedDate: string;
  readonly reportsCounter: number;
};

export class IncidentClosedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "incident.closed";

  readonly description: string;
  readonly impact: string;
  readonly status: string;
  readonly creationDate: string;
  readonly closedDate: string;
  readonly reportsCounter: number;

  constructor({
    id,
    description,
    impact,
    status,
    creationDate,
    closedDate,
    reportsCounter,
    occurredOn,
    eventId,
  }: {
    id: string;
    description: string;
    impact: string;
    status: string;
    creationDate: string;
    closedDate: string;
    reportsCounter: number;
    occurredOn?: Date;
    eventId?: string;
  }) {
    super({
      eventId,
      eventName: IncidentClosedDomainEvent.EVENT_NAME,
      attributes: {
        id,
        description,
        impact,
        status,
        creationDate,
        closedDate,
        reportsCounter,
      },
      occurredOn,
    });

    this.description = description;
    this.impact = impact;
    this.status = status;
    this.creationDate = creationDate;
    this.closedDate = closedDate;
    this.reportsCounter = reportsCounter;
  }

  toPrimitive(): CloseIncidentDomainEventBody {
    return {
      eventName: IncidentClosedDomainEvent.EVENT_NAME,
      id: this.attributes.id,
      description: this.description,
      impact: this.impact,
      status: this.status,
      creationDate: this.creationDate,
      closedDate: this.closedDate,
      reportsCounter: this.reportsCounter,
    };
  }

  static fromPrimitives(
    body: CloseIncidentDomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new IncidentClosedDomainEvent({
      id: body.id,
      description: body.description,
      impact: body.impact,
      status: body.status,
      creationDate: body.creationDate,
      closedDate: body.closedDate,
      reportsCounter: body.reportsCounter,
      eventId,
      occurredOn,
    });
  }
}
