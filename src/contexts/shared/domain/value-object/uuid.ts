import { v4 } from "uuid";
import validate from "uuid-validate";
import { InvalidArgumentError } from "../errors/invalid-argument-error";
import { StringValueObject } from "./string-value-object";

export class Uuid extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidUuid(value);
  }

  static random(): Uuid {
    return new Uuid(v4());
  }

  private ensureIsValidUuid(id: string): void {
    if (!validate(id)) {
      throw new InvalidArgumentError({
        message: `<${this.constructor.name}> does not allow the value <${id}>`,
      });
    }
  }
}
