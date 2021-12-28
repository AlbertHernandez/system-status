import { DependencyName } from "../../../domain/dependency-name";
import {
  instanceToDependencyName,
  ContainerScopeCreator,
} from "../../dependency-injection";
import { Logger } from "../../../domain/logger";
import { QueryBus } from "../../../domain/query-bus";
import { Query, QueryName } from "../../../domain/query";
import { Response } from "../../../domain/response";
import { QueryHandler } from "../../../domain/query-handler";
import { QueryNotRegisteredError } from "../../../domain/errors/query-not-registered-error";

export class InMemoryQueryBus implements QueryBus {
  private readonly queryHandlersMap;
  private readonly containerScopeCreator;

  constructor(dependencies: {
    commandHandlers: Array<QueryHandler>;
    containerScopeCreator: ContainerScopeCreator;
  }) {
    this.containerScopeCreator = dependencies.containerScopeCreator;
    this.queryHandlersMap = this.formatHandlers(dependencies.commandHandlers);
  }

  private formatHandlers(
    commandHandlers: Array<QueryHandler>
  ): Map<QueryName, DependencyName> {
    const handlersMap = new Map();

    commandHandlers.forEach((commandHandler) => {
      handlersMap.set(
        commandHandler.subscribedTo().QUERY_NAME,
        instanceToDependencyName(commandHandler)
      );
    });

    return handlersMap;
  }

  async ask<R extends Response>(query: Query): Promise<R> {
    const queryHandlerClassName = this.queryHandlersMap.get(query.queryName);

    if (!queryHandlerClassName) {
      throw new QueryNotRegisteredError(query);
    }

    const childContainer = this.containerScopeCreator.run({
      queryId: query.queryId,
    });

    const logger = childContainer.resolve<Logger>("logger");

    const handler = childContainer.resolve<QueryHandler>(queryHandlerClassName);

    logger.debug({
      message: "Processing query",
      context: query.getDetails(),
    });

    return (await handler.handle(query)) as Promise<R>;
  }
}
