import { Query } from "../../domain/query";
import { Response } from "../../domain/response";
import { QueryBus } from "../../domain/query-bus";
import { QueryHandlersInformation } from "./query-handlers-information";

export class InMemoryQueryBus implements QueryBus {
  private queryHandlersInformation;

  constructor(dependencies: {
    queryHandlersInformation: QueryHandlersInformation;
  }) {
    this.queryHandlersInformation = dependencies.queryHandlersInformation;
  }

  async ask<R extends Response>(query: Query): Promise<R> {
    const handler = this.queryHandlersInformation.search(query);

    return (await handler.handle(query)) as Promise<R>;
  }
}
