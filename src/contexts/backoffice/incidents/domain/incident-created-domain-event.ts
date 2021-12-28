import { DomainEvent } from "../../../shared/domain/domain-event";

type CreateIncidentDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly description: string;
  readonly impact: string;
  readonly status: string;
  readonly creationDate: string;
  readonly reportsCounter: number;
};

export class IncidentCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "incident.created";

  readonly description: string;
  readonly impact: string;
  readonly status: string;
  readonly creationDate: string;
  readonly reportsCounter: number;

  constructor({
    id,
    description,
    impact,
    status,
    creationDate,
    reportsCounter,
    occurredOn,
    eventId,
  }: {
    id: string;
    description: string;
    impact: string;
    status: string;
    creationDate: string;
    reportsCounter: number;
    occurredOn?: Date;
    eventId?: string;
  }) {
    super({
      eventId,
      eventName: IncidentCreatedDomainEvent.EVENT_NAME,
      attributes: {
        id,
        description,
        impact,
        status,
        creationDate,
        reportsCounter,
      },
      occurredOn,
    });

    this.description = description;
    this.impact = impact;
    this.status = status;
    this.creationDate = creationDate;
    this.reportsCounter = reportsCounter;
  }

  toPrimitive(): CreateIncidentDomainEventBody {
    return {
      eventName: IncidentCreatedDomainEvent.EVENT_NAME,
      id: this.id,
      description: this.description,
      impact: this.impact,
      status: this.status,
      creationDate: this.creationDate,
      reportsCounter: this.reportsCounter,
    };
  }

  static fromPrimitives(
    body: CreateIncidentDomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new IncidentCreatedDomainEvent({
      ...body,
      eventId,
      occurredOn,
    });
  }
}
