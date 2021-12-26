import Koa from "koa";
import { HttpResponse } from "../models/http-response";
import { SchemasConfig } from "../middlewares/schema-validation.middleware";
import { QueryBus } from "../../../../contexts/shared/domain/query-bus";
import { Query } from "../../../../contexts/shared/domain/query";

export abstract class Controller {
  protected readonly queryBus;

  constructor(dependencies: { queryBus: QueryBus }) {
    this.queryBus = dependencies.queryBus;
  }

  async ask<R>(query: Query) {
    return await this.queryBus.ask<R>(query);
  }

  abstract run(ctx: Koa.Context): Promise<HttpResponse>;

  schema?(): SchemasConfig;
}
