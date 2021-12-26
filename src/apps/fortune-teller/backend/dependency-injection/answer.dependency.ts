import * as Awilix from "awilix";
import { FortuneTellerAnswerObtainer } from "../../../../contexts/fortune-teller/answer/application/get-answer/fortune-teller-answer-obtainer";
import { ObtainAnswerQueryHandler } from "../../../../contexts/fortune-teller/answer/application/get-answer/obtain-answer-query-handler";

export const register = (container: Awilix.AwilixContainer) => {
  container.register({
    obtainAnswerQueryHandler: Awilix.asClass(ObtainAnswerQueryHandler),
    fortuneTellerAnswerObtainer: Awilix.asClass(FortuneTellerAnswerObtainer),
  });
};
