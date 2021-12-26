import { Response } from "../../../../shared/domain/response";

export class ObtainPredictionResponse extends Response {
  readonly prediction;

  constructor(prediction: string) {
    super();
    this.prediction = prediction;
  }
}
