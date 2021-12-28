import { Query } from "./query";
import { Response } from "./response";
import { QueryHandler } from "./query-handler";

export interface QueryBus {
  ask<R extends Response>(query: Query): Promise<R>;
  addHandlers(queryHandlers: Array<QueryHandler>): void;
}
