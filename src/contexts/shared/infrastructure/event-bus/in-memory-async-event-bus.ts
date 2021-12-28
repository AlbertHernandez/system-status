import { DomainEvent } from "../../domain/domain-event";
import { DomainEventSubscriber } from "../../domain/domain-event-subscriber";
import { EventBus } from "../../domain/event-bus";
import { EventEmitter } from "events";
import {
  ContainerScopeCreator,
  instanceToDependencyName,
} from "../dependency-injection";

export class InMemoryAsyncEventBus extends EventEmitter implements EventBus {
  private readonly containerScopeCreator;

  constructor(dependencies: {
    domainEventSubscribers?: Array<DomainEventSubscriber<DomainEvent>>;
    containerScopeCreator: ContainerScopeCreator;
  }) {
    super();
    this.containerScopeCreator = dependencies.containerScopeCreator;
    this.registerSubscribers(dependencies.domainEventSubscribers || []);
  }

  async start(): Promise<void> {
    return;
  }

  async publish(events: DomainEvent[]): Promise<void> {
    events.map((event) => this.emit(event.eventName, event));
  }

  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.registerSubscribers(subscribers);
  }

  private registerSubscribers(
    subscribers: DomainEventSubscriber<DomainEvent>[]
  ) {
    subscribers.map((subscriber) => {
      this.registerSubscriber(subscriber);
    });
  }

  private registerSubscriber(subscriber: DomainEventSubscriber<DomainEvent>) {
    subscriber.subscribedTo().map((event) => {
      this.on(event.EVENT_NAME, async (domainEvent: DomainEvent) => {
        await this.onDomainEvent(
          domainEvent,
          instanceToDependencyName(subscriber)
        );
      });
    });
  }

  private async onDomainEvent(
    domainEvent: DomainEvent,
    subscriberName: string
  ) {
    const childContainer = this.containerScopeCreator.run({
      eventId: domainEvent.eventId,
    });

    const subscriberInstance =
      childContainer.resolve<DomainEventSubscriber<DomainEvent>>(
        subscriberName
      );

    await subscriberInstance.on(domainEvent);
  }
}
