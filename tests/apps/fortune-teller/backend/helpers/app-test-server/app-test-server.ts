import request from "supertest";
import { FortuneTellerBackendApp } from "../../../../../../src/apps/fortune-teller/backend/fortune-teller-backend-app";

export class AppTestServer {
  private application?: FortuneTellerBackendApp;
  private request?: request.Test;
  private response?: request.Response;

  async startApplication(): Promise<void> {
    this.application = new FortuneTellerBackendApp();
    await this.application.start();
  }

  async stopApplication(): Promise<void> {
    await this.application?.stop();
  }

  whenAGetRequestIsSendTo(route: string) {
    this.request = request(this.application?.httpServer).get(route);
  }

  async theStatusCodeShouldBe(status: number) {
    this.response = await this.request;
    expect(this.response?.status).toBe(status);
  }

  async theResponseShouldBe(response: Record<string, unknown>) {
    this.response = await this.request;
    expect(this.response?.body).toStrictEqual(response);
  }
}
