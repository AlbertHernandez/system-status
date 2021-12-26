import { AggregateRoot } from "../../../shared/domain/aggregate-root";
import { IncidentId } from "./incident-id";
import { IncidentDescription } from "./incident-description";
import { IncidentImpact } from "./incident-impact";
import { IncidentStatus } from "./incident-status";
import { IncidentCreationDate } from "./incident-creation-date";
import { IncidentClosedDate } from "./incident-closed-date";
import { Nullable } from "../../../shared/domain/nullable";

export class Incident extends AggregateRoot {
  readonly id;
  readonly description;
  readonly impact;
  readonly status;
  readonly creationDate;
  readonly closedDate;

  constructor(dependencies: {
    id: IncidentId;
    description: IncidentDescription;
    impact: IncidentImpact;
    status: IncidentStatus;
    creationDate: IncidentCreationDate;
    closedDate: Nullable<IncidentClosedDate>;
  }) {
    super();
    this.id = dependencies.id;
    this.description = dependencies.description;
    this.impact = dependencies.impact;
    this.status = dependencies.status;
    this.creationDate = dependencies.creationDate;
    this.closedDate = dependencies.closedDate;
  }

  toPrimitives() {
    id: this.id.toString();
    description: this.description.toString();
    impact: this.impact.toString();
    status: this.status.toString();
    creationDate: this.creationDate.toString();
    closedDate: this.closedDate ? this.closedDate.toString() : null;
  }
}
