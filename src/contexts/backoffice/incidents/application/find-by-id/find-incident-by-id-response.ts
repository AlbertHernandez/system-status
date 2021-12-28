import { Response } from "../../../../shared/domain/response";

export class FindIncidentByIdResponse extends Response {
  readonly id;
  readonly description;
  readonly impact;
  readonly status;
  readonly creationDate;
  readonly closedDate;

  constructor(dependencies: {
    id: string;
    description: string;
    impact: string;
    status: string;
    creationDate: string;
    closedDate: string | null;
  }) {
    super();
    this.id = dependencies.id;
    this.description = dependencies.description;
    this.impact = dependencies.impact;
    this.status = dependencies.status;
    this.creationDate = dependencies.creationDate;
    this.closedDate = dependencies.closedDate;
  }
}
