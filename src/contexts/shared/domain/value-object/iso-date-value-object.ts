import { DateValueObject } from "./date-value-object";

export abstract class IsoDateValueObject extends DateValueObject {
  constructor(value: string) {
    super(value);
    this.checkValueIsValidIsoDate(value);
  }

  private checkValueIsValidIsoDate(value: string): void {
    if (!this.isIsoDate(value)) {
      this.throwErrorForInvalidValue(value);
    }
  }

  private isIsoDate(value: string) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(value)) {
      return false;
    }

    return new Date(value).toISOString() === value;
  }
}
