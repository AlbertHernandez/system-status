import { Query } from "../../../../shared/domain/query";

export class FindIncidentReportByIdQuery extends Query {
  static readonly QUERY_NAME = "incidentReport.findById";
  readonly id: string;

  constructor(dependencies: { id: string; queryId?: string }) {
    super({
      queryName: FindIncidentReportByIdQuery.QUERY_NAME,
      queryId: dependencies.queryId,
      attributes: {
        id: dependencies.id,
      },
    });

    this.id = dependencies.id;
  }
}
