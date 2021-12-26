import { MotherCreator } from "./mother-creator";

export class WordCreator {
  static random(): string {
    return MotherCreator.random().lorem.word();
  }

  static withLengthOf(length: number): string {
    return MotherCreator.random().lorem.word(length);
  }
}
