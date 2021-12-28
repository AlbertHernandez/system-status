import { QueryHandler } from "../../../../shared/domain/query-handler";
import { IncidentReportByIncidentIdFinder } from "./incident-report-by-incident-id-finder";
import { FindIncidentReportByIncidentIdQuery } from "./find-incident-report-by-incident-id-query";
import { FindIncidentReportByIncidentIdResponse } from "./find-incident-report-by-incident-id-response";
import { IncidentReportId } from "../../domain/incident-report-id";

export class FindIncidentReportByIncidentIdQueryHandler
  implements
    QueryHandler<
      FindIncidentReportByIncidentIdQuery,
      FindIncidentReportByIncidentIdResponse
    >
{
  private readonly finder;

  constructor(dependencies: {
    incidentReportByIncidentIdFinder: IncidentReportByIncidentIdFinder;
  }) {
    this.finder = dependencies.incidentReportByIncidentIdFinder;
  }

  subscribedTo() {
    return FindIncidentReportByIncidentIdQuery;
  }

  async handle(
    query: FindIncidentReportByIncidentIdQuery
  ): Promise<FindIncidentReportByIncidentIdResponse> {
    const incidentReportId = new IncidentReportId(query.incidentId);
    const incidentReports = await this.finder.run(incidentReportId);
    return new FindIncidentReportByIncidentIdResponse({
      incidentReports: incidentReports.map((incidentReport) =>
        incidentReport.toPrimitives()
      ),
    });
  }
}
