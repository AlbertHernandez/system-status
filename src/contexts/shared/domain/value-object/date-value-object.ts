import { ValueObject } from "./value-object";

export abstract class DateValueObject extends ValueObject<Date> {
  constructor(value: string) {
    super(new Date(value));
    this.checkValueIsValid(value);
  }

  private checkValueIsValid(value: string): void {
    const isValidDate = !isNaN(Date.parse(value));

    if (!isValidDate) {
      this.throwErrorForInvalidValue(value);
    }
  }

  protected abstract throwErrorForInvalidValue(value: string): void;
}
