import { Controller } from "./controller";
import { ObtainPredictionResponse } from "../../../../contexts/fortune-teller/predict/application/create/obtain-prediction-response";
import { ObtainPredictionQuery } from "../../../../contexts/fortune-teller/predict/application/create/obtain-prediction-query";
import { HttpResponse } from "../models/http-response";

export default class PredictionGetController extends Controller {
  async run() {
    const predictionResponse = await this.ask<ObtainPredictionResponse>(
      new ObtainPredictionQuery()
    );

    return new HttpResponse({
      data: predictionResponse.prediction,
    });
  }
}
