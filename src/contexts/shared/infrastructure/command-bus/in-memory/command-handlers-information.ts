import { Command, CommandName } from "../../../domain/command";
import { CommandHandler } from "../../../domain/command-handler";
import { CommandNotRegisteredError } from "../../../domain/errors/command-not-registered-error";
import { DependencyName } from "../../../domain/dependency-name";
import {
  instanceToDependencyName,
  ScopeHandler,
} from "../../dependency-injection";

export class CommandHandlersInformation {
  private readonly scopeHandler;
  private readonly commandHandlersMap;

  constructor(dependencies: {
    commandHandlers: Array<CommandHandler<Command>>;
    scopeHandler: ScopeHandler;
  }) {
    this.scopeHandler = dependencies.scopeHandler;
    this.commandHandlersMap = this.formatHandlers(dependencies.commandHandlers);
  }

  private formatHandlers(
    commandHandlers: Array<CommandHandler<Command>>
  ): Map<CommandName, DependencyName> {
    const handlersMap = new Map();

    commandHandlers.forEach((commandHandler) => {
      handlersMap.set(
        commandHandler.subscribedTo().COMMAND_NAME,
        instanceToDependencyName(commandHandler)
      );
    });

    return handlersMap;
  }

  search(command: Command): CommandHandler<Command> {
    const commandHandlerClassName = this.commandHandlersMap.get(
      command.commandName
    );

    if (!commandHandlerClassName) {
      throw new CommandNotRegisteredError(command);
    }

    const childContainer = this.scopeHandler.createScope({
      scopeInfo: {
        commandName: command.commandName,
        commandId: command.commandId,
        occurredOn: command.occurredOn.toISOString(),
      },
    });

    return childContainer.resolve(commandHandlerClassName);
  }
}
