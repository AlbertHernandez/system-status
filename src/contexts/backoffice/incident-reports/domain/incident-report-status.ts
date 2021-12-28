import { InvalidArgumentError } from "../../../shared/domain/errors/invalid-argument-error";
import { EnumValueObject } from "../../../shared/domain/value-object/enum-value-object";

export enum Status {
  INVESTIGATING = "INVESTIGATING",
  IDENTIFIED = "IDENTIFIED",
  MONITORING = "MONITORING",
  RESOLVED = "RESOLVED",
}

const validValues = Object.values(Status);

export class IncidentReportStatus extends EnumValueObject<Status> {
  constructor(value: Status) {
    super(value, validValues);
  }

  static fromValue(value: string): IncidentReportStatus {
    switch (value) {
      case Status.INVESTIGATING:
        return new IncidentReportStatus(Status.INVESTIGATING);
      case Status.IDENTIFIED:
        return new IncidentReportStatus(Status.IDENTIFIED);
      case Status.MONITORING:
        return new IncidentReportStatus(Status.MONITORING);
      case Status.RESOLVED:
        return new IncidentReportStatus(Status.RESOLVED);
      default:
        throw new InvalidArgumentError({
          message: `<${IncidentReportStatus.name}> does not allow the value <${value}>`,
          meta: { validValues },
        });
    }
  }

  protected throwErrorForInvalidValue(value: unknown): void {
    throw new InvalidArgumentError({
      message: `<IncidentReportStatus.name> does not allow the value <${value}>`,
      meta: { validValues: this.validValues },
    });
  }
}
