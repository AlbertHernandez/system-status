import { Query } from "../../../../shared/domain/query";

export class ObtainAnswerQuery extends Query {
  question: string;

  constructor(question: string) {
    super();
    this.question = question;
  }
}
