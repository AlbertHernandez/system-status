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
      case Impact.NONE:
        return new IncidentImpact(Impact.NONE);
      case Impact.MINOR:
        return new IncidentImpact(Impact.MINOR);
      case Impact.MAJOR:
        return new IncidentImpact(Impact.MAJOR);
      case Impact.CRITICAL:
        return new IncidentImpact(Impact.CRITICAL);
      default:
        throw new InvalidArgumentError({
          message: `<${this.constructor.name}> does not allow the value <${value}>`,
          meta: { validValues },
        });
    }
  }

  protected throwErrorForInvalidValue(value: unknown): void {
    throw new InvalidArgumentError({
      message: `<IncidentImpact.name> does not allow the value <${value}>`,
      meta: { validValues: this.validValues },
    });
  }
}
