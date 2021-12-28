import { DomainEvent } from "../../../../../src/contexts/shared/domain/domain-event";
import { DomainEventSubscriber } from "../../../../../src/contexts/shared/domain/domain-event-subscriber";
import { Uuid } from "../../../../../src/contexts/shared/domain/value-object/uuid";
import { InMemoryAsyncEventBus } from "../../../../../src/contexts/shared/infrastructure/event-bus/in-memory-async-event-bus";
import { LoggerMother } from "../../domain/logger-mother";

const logger = LoggerMother.create();

class DummyEvent extends DomainEvent {
  static EVENT_NAME = "dummy:event";

  constructor(id: string) {
    super({
      eventName: DummyEvent.EVENT_NAME,
      attributes: {
        id,
      },
    });
  }

  toPrimitive() {
    return {
      id: this.id,
    };
  }
}

class DomainEventSubscriberDummy implements DomainEventSubscriber<DummyEvent> {
  subscribedTo() {
    return [DummyEvent];
  }

  async on(event: DummyEvent) {
    logger.info({
      message: "Event received",
      context: event.toPrimitive(),
    });
  }
}

describe("InMemoryAsyncEventBus", () => {
  it("the subscriber should be called when the event it is subscribed to is published", (done) => {
    const eventBus = new InMemoryAsyncEventBus();

    const event = new DummyEvent(Uuid.random().value());

    const subscriber = new DomainEventSubscriberDummy();
    subscriber.on = async (event: DummyEvent) => {
      logger.info({
        message: "Event received",
        context: event.toPrimitive(),
      });
      done();
    };

    eventBus.addSubscribers([subscriber]);

    eventBus.publish([event]);
  });
});
