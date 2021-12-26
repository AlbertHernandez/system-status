import { FortuneTellerAnswerObtainer } from "../../../../../src/contexts/fortune-teller/answer/application/get-answer/fortune-teller-answer-obtainer";

export class FortuneTellerAnswerObtainerMother {
  static create(): FortuneTellerAnswerObtainer {
    return new FortuneTellerAnswerObtainer();
  }
}
