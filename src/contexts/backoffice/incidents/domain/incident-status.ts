import { InvalidArgumentError } from "../../../shared/domain/errors/invalid-argument-error";
import { EnumValueObject } from "../../../shared/domain/value-object/enum-value-object";

export enum Status {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export class IncidentStatus extends EnumValueObject<Status> {
  constructor(value: Status) {
    super(value, Object.values(Status));
  }

  protected throwErrorForInvalidValue(value: unknown): void {
    throw new InvalidArgumentError({
      message: `<${this.constructor.name}> does not allow the value <${value}>`,
      meta: { validValues: this.validValues },
    });
  }
}