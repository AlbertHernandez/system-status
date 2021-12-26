import { Command } from "../../../domain/command";
import { CommandHandler } from "../../../domain/command-handler";
import { CommandNotRegisteredError } from "../../../domain/errors/command-not-registered-error";

export class CommandHandlersInformation {
  private commandHandlersMap;

  constructor(dependencies: {
    commandHandlers: Array<CommandHandler<Command>>;
  }) {
    this.commandHandlersMap = this.formatHandlers(dependencies.commandHandlers);
  }

  private formatHandlers(
    commandHandlers: Array<CommandHandler<Command>>
  ): Map<Command, CommandHandler<Command>> {
    const handlersMap = new Map();

    commandHandlers.forEach((commandHandler) => {
      handlersMap.set(commandHandler.subscribedTo(), commandHandler);
    });

    return handlersMap;
  }

  search(command: Command): CommandHandler<Command> {
    const commandHandler = this.commandHandlersMap.get(command.constructor);

    if (!commandHandler) {
      throw new CommandNotRegisteredError(command);
    }

    return commandHandler;
  }
}
