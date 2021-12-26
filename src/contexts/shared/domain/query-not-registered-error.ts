import { Query } from "./query";
import { BaseError } from "./errors/base-error";

export class QueryNotRegisteredError extends BaseError {
  constructor(query: Query) {
    super({
      message: `The query <${query.constructor.name}> hasn't a query handler associated`,
    });
  }
}
