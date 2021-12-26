import Koa from "koa";
import * as Awilix from "awilix";
import { Controller } from "../controllers/controller";
import { Class } from "../../../../contexts/shared/domain/class";
import {
  SchemasConfig,
  validateSchema,
} from "../middlewares/schema-validation.middleware";

export const handleRequest =
  (controller: Class<Controller> & { schema?(): SchemasConfig }) =>
  async (ctx: Koa.Context) => {
    if (controller.schema) {
      validateSchema(controller.schema(), ctx);
    }

    const controllerName = controller.name;
    const scopedContainer: Awilix.AwilixContainer = ctx.state.container;
    const instance = scopedContainer.resolve<Controller>(controllerName);
    const response = await instance.run(ctx);
    if (response.data) {
      ctx.body = {
        data: response.data,
      };
    }

    if (response.statusCode) {
      ctx.status = response.statusCode;
    }
  };
