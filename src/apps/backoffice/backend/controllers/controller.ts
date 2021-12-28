import Koa from "koa";
import { HttpResponse } from "../models/http-response";
import { SchemasConfig } from "../middlewares/schema-validation.middleware";
import { CommandBus } from "../../../../contexts/shared/domain/command-bus";
import { Command } from "../../../../contexts/shared/domain/command";
import { RequestContext } from "../models/request-context";
import { Logger } from "../../../../contexts/shared/domain/logger";
import { QueryBus } from "../../../../contexts/shared/domain/query-bus";
import { Query } from "../../../../contexts/shared/domain/query";
import { Response } from "../../../../contexts/shared/domain/response";

export abstract class Controller {
  protected readonly commandBus;
  protected readonly requestContext;
  protected readonly logger;
  protected readonly queryBus;

  constructor(dependencies: {
    commandBus: CommandBus;
    queryBus: QueryBus;
    requestContext: RequestContext;
    logger: Logger;
  }) {
    this.commandBus = dependencies.commandBus;
    this.queryBus = dependencies.queryBus;
    this.requestContext = dependencies.requestContext;
    this.logger = dependencies.logger;
  }

  async dispatch(command: Command) {
    await this.commandBus.dispatch(command);
  }

  async ask<R extends Response>(query: Query): Promise<R> {
    return await this.queryBus.ask<R>(query);
  }

  get requestId() {
    return this.requestContext.requestId;
  }

  abstract run(ctx: Koa.Context): Promise<HttpResponse>;

  schema?(): SchemasConfig;
}
