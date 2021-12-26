import { ValueObject } from "./value-object";
import { InvalidArgumentError } from "../errors/invalid-argument-error";

export class DateValueObject extends ValueObject<Date> {
  constructor(value?: string) {
    const date = value ? new Date(value) : new Date();
    super(date);
    if (value) {
      this.checkValueIsValid(value);
    }
  }

  static now(): DateValueObject {
    return new DateValueObject();
  }

  private checkValueIsValid(value: string): void {
    const isValidDate = !isNaN(Date.parse(value));

    if (!isValidDate) {
      this.throwErrorForInvalidValue(value);
    }
  }

  protected throwErrorForInvalidValue(value: string): void {
    throw new InvalidArgumentError({
      message: `<${this.constructor.name}> does not allow the value <${value}>`,
    });
  }
}
