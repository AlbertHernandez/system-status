import { DomainEvent } from "../../domain/domain-event";
import { DomainEventSubscriber } from "../../domain/domain-event-subscriber";
import { EventBus } from "../../domain/event-bus";
import { EventEmitterBus } from "./event-emitter-bus";

export class InMemoryAsyncEventBus implements EventBus {
  private bus: EventEmitterBus;

  constructor(
    dependencies: {
      domainEventSubscribers?: Array<DomainEventSubscriber<DomainEvent>>;
    } = {}
  ) {
    this.bus = new EventEmitterBus(dependencies.domainEventSubscribers || []);
  }

  async start(): Promise<void> {
    return;
  }

  async publish(events: DomainEvent[]): Promise<void> {
    this.bus.publish(events);
  }

  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.bus.registerSubscribers(subscribers);
  }
}
