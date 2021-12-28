import { config } from "../../../contexts/backoffice/shared/infrastructure/config";
import { Server } from "./server";
import { container } from "./dependency-injection/container";
import { EventBus } from "../../../contexts/shared/domain/event-bus";
import { DomainEventSubscriber } from "../../../contexts/shared/domain/domain-event-subscriber";
import { DomainEvent } from "../../../contexts/shared/domain/domain-event";
import { QueryBus } from "../../../contexts/shared/domain/query-bus";
import { QueryHandler } from "../../../contexts/shared/domain/query-handler";
import { CommandBus } from "../../../contexts/shared/domain/command-bus";
import { CommandHandler } from "../../../contexts/shared/domain/command-handler";
import { Command } from "../../../contexts/shared/domain/command";

export class BackofficeBackendApp {
  private server?: Server;

  async start() {
    this.server = new Server({
      port: config.get("server.port"),
    });
    await this.startEventBus();
    await this.startQueryBus();
    await this.startCommandBus();
    return this.server.listen();
  }

  async stop() {
    await this.server?.stop();
  }

  get port(): number {
    if (!this.server) {
      throw new Error("Backoffice backend application has not been started");
    }
    return this.server.port;
  }

  get httpServer() {
    return this.server?.httpServer;
  }

  private async startEventBus() {
    const eventBus = container.resolve<EventBus>("eventBus");

    const domainEventSubscribers = container.resolve<
      Array<DomainEventSubscriber<DomainEvent>>
    >("domainEventSubscribers");

    eventBus.addSubscribers(domainEventSubscribers);

    eventBus.start();
  }

  private async startQueryBus() {
    const queryBus = container.resolve<QueryBus>("queryBus");

    const queryHandlers =
      container.resolve<Array<QueryHandler>>("queryHandlers");

    queryBus.addHandlers(queryHandlers);
  }

  private async startCommandBus() {
    const commandBus = container.resolve<CommandBus>("commandBus");

    const commandHandlers =
      container.resolve<Array<CommandHandler<Command>>>("commandHandlers");

    commandBus.addHandlers(commandHandlers);
  }
}
