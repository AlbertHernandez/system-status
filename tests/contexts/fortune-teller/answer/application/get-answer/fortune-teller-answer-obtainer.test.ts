import { FortuneTellerAnswerObtainerMother } from "../../domain/fortune-teller-answer-obtainer-mother";
import { QuestionCreator } from "../../domain/question-creator";
import { YesAnswer } from "../../../../../../src/contexts/fortune-teller/answer/domain/yes-answer";
import { NoAnswer } from "../../../../../../src/contexts/fortune-teller/answer/domain/no-answer";

describe("FortuneTellerAnswerObtainer", () => {
  it("when the question has less than 5 characters should return Yes", async () => {
    const applicationService = FortuneTellerAnswerObtainerMother.create();

    const question = QuestionCreator.withLessThanFiveCharacters();
    const answer = await applicationService.run(question);

    expect(answer).toBeInstanceOf(YesAnswer);
  });

  it("when the question has more than 4 characters should return No", async () => {
    const applicationService = FortuneTellerAnswerObtainerMother.create();

    const question = QuestionCreator.withMoreThanFourCharacters();
    const answer = await applicationService.run(question);

    expect(answer).toBeInstanceOf(NoAnswer);
  });
});
