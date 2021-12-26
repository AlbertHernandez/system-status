import httpStatus from "http-status";
import { appTestServer } from "../helpers/app-test-server";

const HEALTH_ENDPOINT = "/health";

describe("Api Status", () => {
  beforeAll(async () => {
    await appTestServer.startApplication();
  });

  afterAll(() => {
    appTestServer.stopApplication();
  });

  test("Health entrypoint returns ok when api key is correct", async () => {
    appTestServer.whenAGetRequestIsSendTo(HEALTH_ENDPOINT);
    await appTestServer.theStatusCodeShouldBe(httpStatus.OK);
  });
});
