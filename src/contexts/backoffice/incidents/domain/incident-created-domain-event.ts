import { DomainEvent } from "../../../shared/domain/domain-event";

type CreateIncidentDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly description: string;
  readonly impact: string;
  readonly status: string;
  readonly creationDate: string;
};

export class IncidentCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "incident.created";

  readonly description: string;
  readonly impact: string;
  readonly status: string;
  readonly creationDate: string;

  constructor({
    id,
    description,
    impact,
    status,
    creationDate,
    occurredOn,
    eventId,
  }: {
    id: string;
    description: string;
    impact: string;
    status: string;
    creationDate: string;
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
      },
      occurredOn,
    });

    this.description = description;
    this.impact = impact;
    this.status = status;
    this.creationDate = creationDate;
  }

  toPrimitive(): CreateIncidentDomainEventBody {
    const { attributes, description, impact, status, creationDate } = this;
    return {
      eventName: IncidentCreatedDomainEvent.EVENT_NAME,
      id: attributes.id,
      description,
      impact,
      status,
      creationDate,
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
