import Koa from "koa";
import { HttpResponse } from "../models/http-response";
import { SchemasConfig } from "../middlewares/schema-validation.middleware";

export abstract class Controller {
  abstract run(ctx: Koa.Context): Promise<HttpResponse>;

  schema?(): SchemasConfig;
}
