import { LoggerMother } from "../../../domain/logger-mother";
import { ContainerScopeCreatorMother } from "../../../domain/container-scope-creator-mother";
import { ContainerMother } from "../../../domain/container-mother";
import { Query } from "../../../../../../src/contexts/shared/domain/query";
import { Response } from "../../../../../../src/contexts/shared/domain/response";
import { QueryHandler } from "../../../../../../src/contexts/shared/domain/query-handler";
import { InMemoryQueryBus } from "../../../../../../src/contexts/shared/infrastructure/query-bus/in-memory/in-memory-query-bus";
import { QueryNotRegisteredError } from "../../../../../../src/contexts/shared/domain/errors/query-not-registered-error";

const logger = LoggerMother.create();

class UnhandledQuery extends Query {
  static readonly QUERY_NAME = "unhandled.command";

  constructor() {
    super({ queryName: UnhandledQuery.QUERY_NAME });
  }
}

class HandledQuery extends Query {
  static readonly QUERY_NAME = "handled.command";

  constructor() {
    super({ queryName: HandledQuery.QUERY_NAME });
  }
}

class MyQueryResponse implements Response {}

class MyQueryHandler implements QueryHandler<HandledQuery, MyQueryResponse> {
  subscribedTo() {
    return HandledQuery;
  }

  async handle(query: HandledQuery): Promise<MyQueryResponse> {
    logger.info({
      message: "Query handler executed",
      context: {
        query,
      },
    });

    return new MyQueryResponse();
  }
}

describe("InMemoryCommandBus", () => {
  it("throws an error if dispatches a command without handler", async () => {
    const containerScopeCreator = ContainerScopeCreatorMother.create();
    const unhandledQuery = new UnhandledQuery();
    const queryBus = new InMemoryQueryBus({
      containerScopeCreator,
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

  it("accepts a command with handler", async () => {
    const container = ContainerMother.createRegisteringClasses([
      MyQueryHandler,
    ]);

    const containerScopeCreator =
      ContainerScopeCreatorMother.createWithContainer(container);
    const handledQuery = new HandledQuery();
    const myCommandHandler = new MyQueryHandler();

    const queryBus = new InMemoryQueryBus({
      containerScopeCreator,
    });

    queryBus.addHandlers([myCommandHandler]);

    const response = await queryBus.ask(handledQuery);
    expect(response).toBeInstanceOf(MyQueryResponse);
  });
});
