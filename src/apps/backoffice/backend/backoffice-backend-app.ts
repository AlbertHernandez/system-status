import { config } from "../../../contexts/backoffice/shared/infrastructure/config";
import { Server } from "./server";
import { container } from "./dependency-injection/container";
import { EventBus } from "../../../contexts/shared/domain/event-bus";

export class BackofficeBackendApp {
  private server?: Server;

  async start() {
    this.server = new Server({
      port: config.get("server.port"),
    });
    await this.startEventBus();
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
    eventBus.start();
  }
}
