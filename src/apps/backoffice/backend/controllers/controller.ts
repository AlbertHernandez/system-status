import Koa from "koa";
import { HttpResponse } from "../models/http-response";
import { SchemasConfig } from "../middlewares/schema-validation.middleware";
import { CommandBus } from "../../../../contexts/shared/domain/command-bus";
import { Command } from "../../../../contexts/shared/domain/command";

export abstract class Controller {
  protected readonly commandBus;

  constructor(dependencies: { commandBus: CommandBus }) {
    this.commandBus = dependencies.commandBus;
  }

  async dispatch(command: Command) {
    await this.commandBus.dispatch(command);
  }

  abstract run(ctx: Koa.Context): Promise<HttpResponse | void>;

  schema?(): SchemasConfig;
}
