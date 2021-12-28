import { BaseError } from "./base-error";
import { Query } from "../query";

export class QueryNotRegisteredError extends BaseError {
  constructor(query: Query) {
    super({
      message: `The query <${query.constructor.name}> hasn't a query handler associated`,
      code: "error.domain.queryBus.queryNotRegistered",
      meta: {
        queryName: query.constructor.name,
      },
    });
  }
}
