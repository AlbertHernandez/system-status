import httpStatus from "http-status";
import { backofficeServer } from "../helpers/backoffice-server";

const HEALTH_ENDPOINT = "/health";

describe("Api Status", () => {
  beforeAll(async () => {
    await backofficeServer.startApplication();
  });

  afterAll(() => {
    backofficeServer.stopApplication();
  });

  test("Health entrypoint returns ok when api key is correct", async () => {
    backofficeServer.whenAGetRequestIsSendTo(HEALTH_ENDPOINT);
    await backofficeServer.theStatusCodeShouldBe(httpStatus.OK);
  });
});
