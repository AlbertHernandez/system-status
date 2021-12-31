import { Controller } from "./controller";
import Joi from "joi";
import { Context } from "koa";
import { SchemasConfig } from "../middlewares/schema-validation.middleware";
import { uuid } from "../helpers/uuid";
import { HttpResponse } from "../models/http-response";
import { FindIncidentByIdQuery } from "../../../../contexts/backoffice/incidents/application/find-by-id/find-incident-by-id-query";
import { FindIncidentByIdResponse } from "../../../../contexts/backoffice/incidents/application/find-by-id/find-incident-by-id-response";
import { IncidentNotFoundError } from "../../../../contexts/backoffice/shared/domain/incident-not-found-error";
import { NotFoundError } from "../errors/not-found-error";

export default class IncidentByIdGetController extends Controller {
  static schema(): SchemasConfig {
    return {
      params: Joi.object({
        id: uuid.required(),
      }),
    };
  }

  async run(ctx: Context) {
    const { id } = ctx.params as { id: string };

    try {
      const response = await this.ask<FindIncidentByIdResponse>(
        new FindIncidentByIdQuery({ queryId: this.requestId, id })
      );

      return new HttpResponse({
        data: response,
      });
    } catch (error) {
      if (error instanceof IncidentNotFoundError) {
        throw new NotFoundError({
          message: error.message,
        });
      }

      throw error;
    }
  }
}
