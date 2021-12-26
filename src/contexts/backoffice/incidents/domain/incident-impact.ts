import { InvalidArgumentError } from "../../../shared/domain/errors/invalid-argument-error";
import { EnumValueObject } from "../../../shared/domain/value-object/enum-value-object";

export enum Impact {
  NONE = "NONE",
  MINOR = "MINOR",
  MAJOR = "MAJOR",
  CRITICAL = "CRITICAL",
}

const validValues = Object.values(Impact);

export class IncidentImpact extends EnumValueObject<Impact> {
  constructor(value: Impact) {
    super(value, validValues);
  }

  static fromValue(value: string): IncidentImpact {
    switch (value) {
      case (Impact.NONE, Impact.MINOR, Impact.MAJOR, Impact.CRITICAL):
        return new IncidentImpact(value);
      default:
        throw new InvalidArgumentError({
          message: `<${this.constructor.name}> does not allow the value <${value}>`,
          meta: { validValues },
        });
    }
  }

  protected throwErrorForInvalidValue(value: unknown): void {
    throw new InvalidArgumentError({
      message: `<${this.constructor.name}> does not allow the value <${value}>`,
      meta: { validValues: this.validValues },
    });
  }
}
