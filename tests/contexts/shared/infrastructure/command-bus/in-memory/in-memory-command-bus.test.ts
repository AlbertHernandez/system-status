import { Command } from "../../../../../../src/contexts/shared/domain/command";
import { CommandHandler } from "../../../../../../src/contexts/shared/domain/command-handler";
import { CommandNotRegisteredError } from "../../../../../../src/contexts/shared/domain/errors/command-not-registered-error";
import { CommandHandlersInformation } from "../../../../../../src/contexts/shared/infrastructure/command-bus/in-memory/command-handlers-information";
import { InMemoryCommandBus } from "../../../../../../src/contexts/shared/infrastructure/command-bus/in-memory/in-memory-command-bus";
import { LoggerMother } from "../../../domain/logger-mother";

const logger = LoggerMother.create();

class UnhandledCommand extends Command {
  static COMMAND_NAME = "unhandled.command";
}

class HandledCommand extends Command {
  static COMMAND_NAME = "handled.command";
}

class MyCommandHandler implements CommandHandler<HandledCommand> {
  subscribedTo(): HandledCommand {
    return HandledCommand;
  }

  async handle(command: HandledCommand): Promise<void> {
    logger.info({
      message: "Command handler executed",
      context: {
        command,
      },
    });
  }
}

describe("InMemoryCommandBus", () => {
  it("throws an error if dispatches a command without handler", async () => {
    const unhandledCommand = new UnhandledCommand();
    const commandHandlersInformation = new CommandHandlersInformation({
      commandHandlers: [],
    });
    const commandBus = new InMemoryCommandBus({ commandHandlersInformation });

    let exception = null;

    try {
      await commandBus.dispatch(unhandledCommand);
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeInstanceOf(CommandNotRegisteredError);
    if (exception instanceof CommandNotRegisteredError) {
      expect(exception.message).toBe(
        `The command <UnhandledCommand> hasn't a command handler associated`
      );
    }
  });

  it("accepts a command with handler", async () => {
    const handledCommand = new HandledCommand();
    const myCommandHandler = new MyCommandHandler();
    const commandHandlersInformation = new CommandHandlersInformation({
      commandHandlers: [myCommandHandler],
    });
    const commandBus = new InMemoryCommandBus({ commandHandlersInformation });

    await commandBus.dispatch(handledCommand);
  });
});
