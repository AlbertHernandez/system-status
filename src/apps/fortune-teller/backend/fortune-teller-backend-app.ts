import { config } from "../../../contexts/fortune-teller/shared/infrastructure/config";
import { Server } from "./server";

export class FortuneTellerBackendApp {
  private server?: Server;

  async start() {
    this.server = new Server({
      port: config.get("server.port"),
    });
    return this.server.listen();
  }

  async stop() {
    await this.server?.stop();
  }

  get port(): number {
    if (!this.server) {
      throw new Error(
        "Fortune Teller backend application has not been started"
      );
    }
    return this.server.port;
  }

  get httpServer() {
    return this.server?.httpServer;
  }
}
