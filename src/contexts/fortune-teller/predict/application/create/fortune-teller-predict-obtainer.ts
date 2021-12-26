import { Logger } from "../../../../shared/domain/logger";
import { Prediction } from "../../domain/prediction";

export class FortuneTellerPredictObtainer {
  private readonly logger;

  constructor(dependencies: { logger: Logger }) {
    this.logger = dependencies.logger;
  }

  async run(): Promise<Prediction> {
    this.logger.info("FortuneTellerPredictObtainer");
    return new Prediction("This is a prediction");
  }
}
