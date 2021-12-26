import { QueryHandler } from "../../domain/query-handler";
import { Query } from "../../domain/query";
import { Response } from "../../domain/response";
import { QueryNotRegisteredError } from "../../domain/query-not-registered-error";

export class QueryHandlersInformation {
  private queryHandlersMap: Map<Query, QueryHandler<Query, Response>>;

  constructor(dependencies: {
    queryHandlers: Array<QueryHandler<Query, Response>>;
  }) {
    this.queryHandlersMap = this.formatHandlers(dependencies.queryHandlers);
  }

  private formatHandlers(
    queryHandlers: Array<QueryHandler<Query, Response>>
  ): Map<Query, QueryHandler<Query, Response>> {
    const handlersMap = new Map();

    queryHandlers.forEach((queryHandler) => {
      handlersMap.set(queryHandler.subscribedTo(), queryHandler);
    });

    return handlersMap;
  }

  public search(query: Query): QueryHandler<Query, Response> {
    const queryHandler = this.queryHandlersMap.get(query.constructor);

    if (!queryHandler) {
      throw new QueryNotRegisteredError(query);
    }

    return queryHandler;
  }
}
