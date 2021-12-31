import { Controller } from "./controller";
import Joi from "joi";
import { Context } from "koa";
import { SchemasConfig } from "../middlewares/schema-validation.middleware";
import { CreateIncidentCommand } from "../../../../contexts/backoffice/incidents/application/create/create-incident-command";
import { Impact } from "../../../../contexts/backoffice/incidents/domain/incident-impact";
import { uuid } from "../helpers/uuid";
import { HttpResponse } from "../models/http-response";

export default class IncidentPutController extends Controller {
  static schema(): SchemasConfig {
    return {
      body: Joi.object({
        description: Joi.string().required(),
        impact: Joi.string()
          .valid(...Object.values(Impact))
          .required(),
      }),
      params: Joi.object({
        id: uuid.required(),
      }),
    };
  }

  async run(ctx: Context) {
    const { description, impact } = ctx.request.body as {
      description: string;
      impact: string;
    };

    const { id } = ctx.params as { id: string };
    await this.dispatch(
      new CreateIncidentCommand({
        id,
        description,
        impact,
        commandId: this.requestId,
      })
    );

    return new HttpResponse();
  }
}
