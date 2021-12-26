import * as Awilix from "awilix";
import { FortuneTellerPredictObtainer } from "../../../../contexts/fortune-teller/predict/application/create/fortune-teller-predict-obtainer";
import { ObtainPredictionQueryHandler } from "../../../../contexts/fortune-teller/predict/application/create/obtain-prediction-query-handler";

export const register = (container: Awilix.AwilixContainer) => {
  container.register({
    fortuneTellerPredictObtainer: Awilix.asClass(FortuneTellerPredictObtainer),
    obtainPredictionQueryHandler: Awilix.asClass(ObtainPredictionQueryHandler),
  });
};
