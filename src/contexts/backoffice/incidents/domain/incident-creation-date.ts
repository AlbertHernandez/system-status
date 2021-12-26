import { InvalidArgumentError } from "../../../shared/domain/errors/invalid-argument-error";
import { IsoDateValueObject } from "../../../shared/domain/value-object/iso-date-value-object";

export class IncidentCreationDate extends IsoDateValueObject {
  protected throwErrorForInvalidValue(value: unknown): void {
    throw new InvalidArgumentError({
      message: `<${this.constructor.name}> does not allow the value ${value}`,
    });
  }
}
