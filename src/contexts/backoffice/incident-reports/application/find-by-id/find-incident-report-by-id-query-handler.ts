import { QueryHandler } from "../../../../shared/domain/query-handler";
import { IncidentReportByIdFinder } from "./incident-report-by-id-finder";
import { FindIncidentReportByIdQuery } from "./find-incident-report-by-id-query";
import { FindIncidentReportByIdResponse } from "./find-incident-report-by-id-response";
import { IncidentReportId } from "../../domain/incident-report-id";

export class FindIncidentReportByIdQueryHandler
  implements
    QueryHandler<FindIncidentReportByIdQuery, FindIncidentReportByIdResponse>
{
  private readonly finder;

  constructor(dependencies: {
    incidentReportByIdFinder: IncidentReportByIdFinder;
  }) {
    this.finder = dependencies.incidentReportByIdFinder;
  }

  subscribedTo() {
    return FindIncidentReportByIdQuery;
  }

  async handle(
    query: FindIncidentReportByIdQuery
  ): Promise<FindIncidentReportByIdResponse> {
    const incidentReportId = new IncidentReportId(query.id);
    const incidentReport = await this.finder.run(incidentReportId);
    return new FindIncidentReportByIdResponse(incidentReport.toPrimitives());
  }
}
