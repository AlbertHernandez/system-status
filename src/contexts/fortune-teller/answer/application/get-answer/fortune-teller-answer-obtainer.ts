import { YesAnswer } from "../../domain/yes-answer";
import { NoAnswer } from "../../domain/no-answer";
import { Question } from "../../domain/question";
import { Answer } from "../../domain/answer";

export class FortuneTellerAnswerObtainer {
  async run(question: Question): Promise<Answer> {
    if (question.value.length < 5) {
      return new YesAnswer();
    }
    return new NoAnswer();
  }
}
