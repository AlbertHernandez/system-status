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

  registerSubscribers(subscribers: DomainEventSubscriber<DomainEvent>[]) {
    subscribers.map((subscriber) => {
      this.registerSubscriber(subscriber);
    });
  }

  private registerSubscriber(subscriber: DomainEventSubscriber<DomainEvent>) {
    subscriber.subscribedTo().map((event) => {
      this.on(event.EVENT_NAME, async (domainEvent: DomainEvent) => {
        const childContainer = this.containerScopeCreator.run({
          eventId: domainEvent.eventId,
        });

        const subscriberName = instanceToDependencyName(subscriber);

        const subscriberInstance =
          childContainer.resolve<DomainEventSubscriber<DomainEvent>>(
            subscriberName
          );

        await subscriberInstance.on(domainEvent);
      });
    });
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
}
