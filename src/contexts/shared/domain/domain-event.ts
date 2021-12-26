import { Uuid } from "./value-object/uuid";

export type DomainEventClass = {
  EVENT_NAME: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fromPrimitives(...args: any[]): DomainEvent;
};

export type Attributes = {
  id: string;
  [key: string]: unknown;
};

export abstract class DomainEvent {
  static EVENT_NAME: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromPrimitives: (...args: any[]) => any;
  readonly eventId: string;
  readonly eventName: string;
  readonly occurredOn: Date;
  readonly meta: Record<string, unknown>;
  readonly attributes: Attributes;

  constructor(dependencies: {
    eventName: string;
    attributes: Attributes;
    eventId?: string;
    occurredOn?: Date;
    meta?: Record<string, unknown>;
  }) {
    this.eventId = dependencies.eventId || Uuid.random().value();
    this.eventName = dependencies.eventName;
    this.occurredOn = dependencies.occurredOn || new Date();
    this.attributes = dependencies.attributes;
    this.meta = dependencies.meta || {};
  }

  abstract toPrimitive(): Record<string, unknown>;
}
