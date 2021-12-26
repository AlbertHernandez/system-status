import { FortuneTellerPredictObtainerMother } from "../../domain/fortune-teller-predict-obtainer-mother";

describe("FortuneTellerPredictObtainer", () => {
  it("get a prediction", async () => {
    const applicationService = FortuneTellerPredictObtainerMother.create();

    const prediction = await applicationService.run();

    expect(prediction.value).toBe("This is a prediction");
  });
});
