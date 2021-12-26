import { Query } from "../../../../src/contexts/shared/domain/query";
import { Response } from "../../../../src/contexts/shared/domain/response";
import { QueryHandler } from "../../../../src/contexts/shared/domain/query-handler";
import { QueryHandlersInformation } from "../../../../src/contexts/shared/infrastructure/query-bus/query-handlers-information";
import { InMemoryQueryBus } from "../../../../src/contexts/shared/infrastructure/query-bus/in-memory-query-bus";
import { QueryNotRegisteredError } from "../../../../src/contexts/shared/domain/query-not-registered-error";

class UnhandledQuery extends Query {}

class HandledQuery extends Query {}

class MyQueryHandler implements QueryHandler<Query, Response> {
  subscribedTo(): HandledQuery {
    return HandledQuery;
  }

  async handle(): Promise<Response> {
    return {};
  }
}

describe("InMemoryQueryBus", () => {
  it("throws an error if dispatches a query without handler", async () => {
    const unhandledQuery = new UnhandledQuery();
    const queryHandlersInformation = new QueryHandlersInformation({
      queryHandlers: [],
    });
    const queryBus = new InMemoryQueryBus({
      queryHandlersInformation,
    });

    let exception = null;

    try {
      await queryBus.ask(unhandledQuery);
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeInstanceOf(QueryNotRegisteredError);
    if (exception instanceof QueryNotRegisteredError) {
      expect(exception.message).toBe(
        `The query <UnhandledQuery> hasn't a query handler associated`
      );
    }
  });

  it("accepts a query with handler", async () => {
    const handledQuery = new HandledQuery();
    const myQueryHandler = new MyQueryHandler();
    const queryHandlersInformation = new QueryHandlersInformation({
      queryHandlers: [myQueryHandler],
    });
    const queryBus = new InMemoryQueryBus({ queryHandlersInformation });

    await queryBus.ask(handledQuery);
  });
});
