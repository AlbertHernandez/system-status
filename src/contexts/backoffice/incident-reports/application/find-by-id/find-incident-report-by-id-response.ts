import { Response } from "../../../../shared/domain/response";

export class FindIncidentReportByIdResponse extends Response {
  readonly id;
  readonly incidentId;
  readonly message;
  readonly status;

  constructor(dependencies: {
    id: string;
    incidentId: string;
    message: string;
    status: string;
  }) {
    super();
    this.id = dependencies.id;
    this.incidentId = dependencies.incidentId;
    this.message = dependencies.message;
    this.status = dependencies.status;
  }
}
