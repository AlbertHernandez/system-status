import { InvalidArgumentError } from "../../../shared/domain/errors/invalid-argument-error";
import { EnumValueObject } from "../../../shared/domain/value-object/enum-value-object";

export enum Impact {
  NONE = "NONE",
  MINOR = "MINOR",
  MAJOR = "MAJOR",
  CRITICAL = "CRITICAL",
}

export class IncidentImpact extends EnumValueObject<Impact> {
  constructor(value: Impact) {
    super(value, Object.values(Impact));
  }

  protected throwErrorForInvalidValue(value: unknown): void {
    throw new InvalidArgumentError({
      message: `<${this.constructor.name}> does not allow the value <${value}>`,
      meta: { validValues: this.validValues },
    });
  }
}
