import { BaseError } from "./base-error";
import { Command } from "../command";

export class CommandNotRegisteredError extends BaseError {
  constructor(command: Command) {
    super({
      message: `The command <${command.constructor.name}> hasn't a command handler associated`,
      code: "error.domain.commandBus.commandNotRegistered",
      meta: {
        commandName: command.constructor.name,
      },
    });
  }
}
