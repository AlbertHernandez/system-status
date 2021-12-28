import { IncidentId } from "../../domain/incident-id";
import { IncidentByIdFinder } from "./incident-by-id-finder";
import { QueryHandler } from "../../../../shared/domain/query-handler";
import { FindIncidentByIdQuery } from "./find-incident-by-id-query";
import { FindIncidentByIdResponse } from "./find-incident-by-id-response";

export class FindIncidentByIdQueryHandler
  implements QueryHandler<FindIncidentByIdQuery, FindIncidentByIdResponse>
{
  private readonly finder;

  constructor(dependencies: { incidentByIdFinder: IncidentByIdFinder }) {
    this.finder = dependencies.incidentByIdFinder;
  }

  subscribedTo() {
    return FindIncidentByIdQuery;
  }

  async handle(
    query: FindIncidentByIdQuery
  ): Promise<FindIncidentByIdResponse> {
    const incidentId = new IncidentId(query.id);
    const incident = await this.finder.run(incidentId);
    return new FindIncidentByIdResponse(incident.toPrimitives());
  }
}
