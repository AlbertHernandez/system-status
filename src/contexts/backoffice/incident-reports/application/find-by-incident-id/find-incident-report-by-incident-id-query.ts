import { Query } from "../../../../shared/domain/query";

export class FindIncidentReportByIncidentIdQuery extends Query {
  static readonly QUERY_NAME = "incidentReport.findByIncidentId";
  readonly incidentId: string;

  constructor(dependencies: { incidentId: string; queryId?: string }) {
    super({
      queryName: FindIncidentReportByIncidentIdQuery.QUERY_NAME,
      queryId: dependencies.queryId,
      attributes: {
        incidentId: dependencies.incidentId,
      },
    });

    this.incidentId = dependencies.incidentId;
  }
}
