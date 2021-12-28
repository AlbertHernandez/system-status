import { NumberValueObject } from "../../../shared/domain/value-object/int-value-object";

export class IncidentReportsCounter extends NumberValueObject {
  static initialize(): IncidentReportsCounter {
    return new IncidentReportsCounter(0);
  }
}
