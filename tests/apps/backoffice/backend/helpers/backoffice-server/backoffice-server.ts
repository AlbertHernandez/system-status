import request from "supertest";
import { BackofficeBackendApp } from "../../../../../../src/apps/backoffice/backend/backoffice-backend-app";

export class BackofficeServer {
  private application?: BackofficeBackendApp;
  private request?: request.Test;
  private response?: request.Response;

  async startApplication(): Promise<void> {
    this.application = new BackofficeBackendApp();
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
