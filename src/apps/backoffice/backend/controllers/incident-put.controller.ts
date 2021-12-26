import { Controller } from "./controller";
import Joi from "joi";
import Koa from "koa";
import { SchemasConfig } from "../middlewares/schema-validation.middleware";
import { CreateIncidentCommand } from "../../../../contexts/backoffice/incidents/application/create/create-incident-command";
import { IncidentImpact } from "../../../../contexts/backoffice/incidents/domain/incident-impact";
import { uuid } from "../helpers/uuid";

export default class IncidentPutController extends Controller {
  static schema(): SchemasConfig {
    return {
      body: Joi.object({
        description: Joi.string().required(),
        impact: Joi.string()
          .valid(...Object.values(IncidentImpact))
          .required(),
      }),
      params: Joi.object({
        id: uuid.required(),
      }),
    };
  }

  async run(ctx: Koa.Context) {
    const { description, impact } = ctx.query as {
      description: string;
      impact: string;
    };

    const { id } = ctx.params as { id: string };
    await this.dispatch(
      new CreateIncidentCommand({
        id,
        description,
        impact,
      })
    );
  }
}
