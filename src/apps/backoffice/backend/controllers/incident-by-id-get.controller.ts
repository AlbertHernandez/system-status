import { Controller } from "./controller";
import Joi from "joi";
import Koa from "koa";
import { SchemasConfig } from "../middlewares/schema-validation.middleware";
import { uuid } from "../helpers/uuid";
import { HttpResponse } from "../models/http-response";
import { FindIncidentByIdQuery } from "../../../../contexts/backoffice/incidents/application/find-by-id/find-incident-by-id-query";
import { FindIncidentByIdResponse } from "../../../../contexts/backoffice/incidents/application/find-by-id/find-incident-by-id-response";

export default class IncidentByIdGetController extends Controller {
  static schema(): SchemasConfig {
    return {
      params: Joi.object({
        id: uuid.required(),
      }),
    };
  }

  async run(ctx: Koa.Context) {
    const { id } = ctx.params as { id: string };

    const response = await this.ask<FindIncidentByIdResponse>(
      new FindIncidentByIdQuery({ queryId: this.requestId, id })
    );

    return new HttpResponse({
      data: response,
    });
  }
}
