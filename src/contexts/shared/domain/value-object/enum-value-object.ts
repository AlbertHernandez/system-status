import { ValueObject } from "./value-object";

export abstract class EnumValueObject<T> extends ValueObject<T> {
  constructor(value: T, public readonly validValues: T[]) {
    super(value);
    this.checkValueIsValid(value);
  }

  private checkValueIsValid(value: T): void {
    if (!this.validValues.includes(value)) {
      this.throwErrorForInvalidValue(value);
    }
  }

  protected abstract throwErrorForInvalidValue(value: T): void;
}
