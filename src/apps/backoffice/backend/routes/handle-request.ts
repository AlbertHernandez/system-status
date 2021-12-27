import Koa from "koa";
import { Controller } from "../controllers/controller";
import { Class } from "../../../../contexts/shared/domain/class";
import {
  SchemasConfig,
  validateSchema,
} from "../middlewares/schema-validation.middleware";
import { Container } from "../../../../contexts/shared/infrastructure/dependency-injection/dependency-injection";

export const handleRequest =
  (controller: Class<Controller> & { schema?(): SchemasConfig }) =>
  async (ctx: Koa.Context) => {
    if (controller.schema) {
      await validateSchema(controller.schema(), ctx);
    }

    const controllerName = controller.name;
    const scopedContainer: Container = ctx.state.container;
    const instance = scopedContainer.resolve<Controller>(controllerName);
    const response = await instance.run(ctx);

    if (response.data) {
      ctx.body = {
        data: response.data,
      };
    }

    ctx.status = response.statusCode;
  };
