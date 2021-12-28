import { AggregateRoot } from "../../../shared/domain/aggregate-root";
import { IncidentId } from "../../shared/domain/incident-id";
import { IncidentReportMessage } from "./incident-report-message";
import { IncidentReportStatus } from "./incident-report-status";
import { IncidentReportId } from "./incident-report-id";
import { IncidentReportCreatedDomainEvent } from "./incident-report-created-domain-event";
import { IncidentReportResolvedDomainEvent } from "./incident-report-resolved-domain-event";

export class IncidentReport extends AggregateRoot {
  readonly incidentId;
  readonly id;
  readonly message;
  readonly status;

  constructor(dependencies: {
    incidentId: IncidentId;
    id: IncidentReportId;
    message: IncidentReportMessage;
    status: IncidentReportStatus;
  }) {
    super();

    this.incidentId = dependencies.incidentId;
    this.id = dependencies.id;
    this.message = dependencies.message;
    this.status = dependencies.status;
  }

  static create(payload: {
    incidentId: IncidentId;
    id: IncidentReportId;
    message: IncidentReportMessage;
    status: IncidentReportStatus;
  }): IncidentReport {
    const incidentReport = new IncidentReport({
      incidentId: payload.incidentId,
      id: payload.id,
      message: payload.message,
      status: payload.status,
    });

    incidentReport.record(
      new IncidentReportCreatedDomainEvent({
        incidentId: incidentReport.incidentId.toString(),
        id: incidentReport.id.toString(),
        message: incidentReport.message.toString(),
        status: incidentReport.status.toString(),
      })
    );

    incidentReport.addResolvedDomainEventIfNeeded();

    return incidentReport;
  }

  private addResolvedDomainEventIfNeeded() {
    if (!this.status.isResolved()) {
      return;
    }

    this.record(
      new IncidentReportResolvedDomainEvent({
        incidentId: this.incidentId.toString(),
        id: this.id.toString(),
        message: this.message.toString(),
      })
    );
  }

  static fromPrimitives(plainData: {
    incidentId: string;
    id: string;
    message: string;
    status: string;
  }): IncidentReport {
    return new IncidentReport({
      incidentId: new IncidentId(plainData.incidentId),
      id: new IncidentReportId(plainData.id),
      message: new IncidentReportMessage(plainData.message),
      status: IncidentReportStatus.fromValue(plainData.status),
    });
  }

  toPrimitives() {
    return {
      incidentId: this.incidentId.toString(),
      id: this.id.toString(),
      message: this.message.toString(),
      status: this.status.toString(),
    };
  }
}
