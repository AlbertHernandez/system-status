import { Question } from "../../../../../src/contexts/fortune-teller/answer/domain/question";
import { WordCreator } from "./word-creator";

export class QuestionCreator {
  static random(): Question {
    return new Question(WordCreator.random());
  }

  static withLessThanFiveCharacters(): Question {
    return new Question(WordCreator.withLengthOf(4));
  }

  static withMoreThanFourCharacters(): Question {
    return new Question(WordCreator.withLengthOf(5));
  }
}
