import { Response } from "../../../../shared/domain/response";

export class ObtainAnswerResponse extends Response {
  readonly answer;

  constructor(answer: string) {
    super();
    this.answer = answer;
  }
}
