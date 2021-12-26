import { QueryHandler } from "../../../../shared/domain/query-handler";
import { ObtainPredictionQuery } from "./obtain-prediction-query";
import { ObtainPredictionResponse } from "./obtain-prediction-response";
import { FortuneTellerPredictObtainer } from "./fortune-teller-predict-obtainer";

export class ObtainPredictionQueryHandler
  implements QueryHandler<ObtainPredictionQuery, ObtainPredictionResponse>
{
  private readonly fortuneTellerPredictObtainer;

  constructor(dependencies: {
    fortuneTellerPredictObtainer: FortuneTellerPredictObtainer;
  }) {
    this.fortuneTellerPredictObtainer =
      dependencies.fortuneTellerPredictObtainer;
  }

  subscribedTo(): ObtainPredictionQuery {
    return ObtainPredictionQuery;
  }

  async handle(): Promise<ObtainPredictionResponse> {
    const prediction = await this.fortuneTellerPredictObtainer.run();
    return new ObtainPredictionResponse(prediction.value);
  }
}
