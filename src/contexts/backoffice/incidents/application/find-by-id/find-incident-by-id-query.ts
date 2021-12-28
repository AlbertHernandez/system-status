import { Query } from "../../../../shared/domain/query";

export class FindIncidentByIdQuery extends Query {
  static readonly QUERY_NAME = "incident.findById";
  readonly id: string;

  constructor(dependencies: { id: string; queryId?: string }) {
    super({
      queryName: FindIncidentByIdQuery.QUERY_NAME,
      queryId: dependencies.queryId,
      attributes: {
        id: dependencies.id,
      },
    });

    this.id = dependencies.id;
  }
}
