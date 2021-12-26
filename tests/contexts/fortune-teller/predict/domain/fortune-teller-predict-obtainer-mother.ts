import { FortuneTellerPredictObtainer } from "../../../../../src/contexts/fortune-teller/predict/application/create/fortune-teller-predict-obtainer";
import { LoggerMother } from "../../../shared/domain/logger-mother";

export class FortuneTellerPredictObtainerMother {
  static create(): FortuneTellerPredictObtainer {
    return new FortuneTellerPredictObtainer({
      logger: LoggerMother.create(),
    });
  }
}
