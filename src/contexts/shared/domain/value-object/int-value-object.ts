import { ValueObject } from "./value-object";

export abstract class NumberValueObject extends ValueObject<number> {
  equalsTo(other: NumberValueObject): boolean {
    return this.value === other.value;
  }

  isBiggerThan(other: NumberValueObject): boolean {
    return this.value > other.value;
  }
}
