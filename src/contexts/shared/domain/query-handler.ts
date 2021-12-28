import { Query, QueryClass } from "./query";
import { Response } from "./response";

export interface QueryHandler<
  Q extends Query = Query,
  R extends Response = Response
> {
  subscribedTo(): QueryClass;
  handle(query: Q): Promise<R>;
}
