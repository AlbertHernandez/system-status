import { AggregateRoot } from "../../../shared/domain/aggregate-root";
import { IncidentId } from "../../shared/domain/incident-id";
import { IncidentDescription } from "./incident-description";
import { IncidentImpact } from "./incident-impact";
import { IncidentStatus, Status } from "./incident-status";
import { IncidentCreationDate } from "./incident-creation-date";
import { IncidentClosedDate } from "./incident-closed-date";
import { Nullable } from "../../../shared/domain/nullable";
import { IncidentCreatedDomainEvent } from "./incident-created-domain-event";
import { IncidentClosedDomainEvent } from "./incident-closed-domain-event";

export class Incident extends AggregateRoot {
  readonly id;
  readonly description;
  readonly impact;
  status;
  readonly creationDate;
  closedDate: Nullable<IncidentClosedDate>;

  constructor(dependencies: {
    id: IncidentId;
    description: IncidentDescription;
    impact: IncidentImpact;
    status: IncidentStatus;
    creationDate: IncidentCreationDate;
    closedDate?: Nullable<IncidentClosedDate>;
  }) {
    super();
    this.id = dependencies.id;
    this.description = dependencies.description;
    this.impact = dependencies.impact;
    this.status = dependencies.status;
    this.creationDate = dependencies.creationDate;
    this.closedDate = dependencies.closedDate || null;
  }

  close() {
    this.status = new IncidentStatus(Status.CLOSED);
    this.closedDate = new IncidentClosedDate();

    this.record(
      new IncidentClosedDomainEvent({
        id: this.id.toString(),
        description: this.description.toString(),
        status: this.status.toString(),
        impact: this.impact.toString(),
        creationDate: this.creationDate.toString(),
        closedDate: this.closedDate.toString(),
      })
    );
  }

  static open(payload: {
    id: IncidentId;
    description: IncidentDescription;
    impact: IncidentImpact;
  }): Incident {
    const incident = new Incident({
      id: payload.id,
      description: payload.description,
      impact: payload.impact,
      status: new IncidentStatus(Status.OPEN),
      creationDate: new IncidentCreationDate(),
    });

    incident.record(
      new IncidentCreatedDomainEvent({
        id: incident.id.toString(),
        description: incident.description.toString(),
        status: incident.status.toString(),
        impact: incident.impact.toString(),
        creationDate: incident.creationDate.toString(),
      })
    );

    return incident;
  }

  static fromPrimitives(plainData: {
    id: string;
    description: string;
    impact: string;
    status: string;
    creationDate: string;
    closedDate?: string | null;
  }): Incident {
    return new Incident({
      id: new IncidentId(plainData.id),
      description: new IncidentDescription(plainData.description),
      impact: IncidentImpact.fromValue(plainData.impact),
      status: IncidentStatus.fromValue(plainData.status),
      creationDate: new IncidentCreationDate(plainData.creationDate),
      closedDate: plainData.closedDate
        ? new IncidentClosedDate(plainData.closedDate)
        : null,
    });
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      description: this.description.toString(),
      impact: this.impact.toString(),
      status: this.status.toString(),
      creationDate: this.creationDate.toString(),
      closedDate: this.closedDate ? this.closedDate.toString() : null,
    };
  }
}
