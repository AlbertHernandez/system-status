import { InvalidArgumentError } from "../../../shared/domain/errors/invalid-argument-error";
import { EnumValueObject } from "../../../shared/domain/value-object/enum-value-object";

export enum Status {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

const validValues = Object.values(Status);

export class IncidentStatus extends EnumValueObject<Status> {
  constructor(value: Status) {
    super(value, validValues);
  }

  static fromValue(value: string): IncidentStatus {
    switch (value) {
      case Status.CLOSED:
        return new IncidentStatus(Status.CLOSED);
      case Status.OPEN:
        return new IncidentStatus(Status.OPEN);
      default:
        throw new InvalidArgumentError({
          message: `<${this.constructor.name}> does not allow the value <${value}>`,
          meta: { validValues },
        });
    }
  }

  protected throwErrorForInvalidValue(value: unknown): void {
    throw new InvalidArgumentError({
      message: `<IncidentStatus.name> does not allow the value <${value}>`,
      meta: { validValues: this.validValues },
    });
  }
}
