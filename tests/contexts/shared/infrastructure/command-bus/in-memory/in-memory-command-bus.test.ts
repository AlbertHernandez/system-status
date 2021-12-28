import { Command } from "../../../../../../src/contexts/shared/domain/command";
import { CommandHandler } from "../../../../../../src/contexts/shared/domain/command-handler";
import { CommandNotRegisteredError } from "../../../../../../src/contexts/shared/domain/errors/command-not-registered-error";
import { InMemoryCommandBus } from "../../../../../../src/contexts/shared/infrastructure/command-bus/in-memory/in-memory-command-bus";
import { LoggerMother } from "../../../domain/logger-mother";
import { ContainerScopeCreatorMother } from "../../../domain/container-scope-creator-mother";
import { ContainerMother } from "../../../domain/container-mother";

const logger = LoggerMother.create();

class UnhandledCommand extends Command {
  static readonly COMMAND_NAME = "unhandled.command";

  constructor() {
    super({ commandName: UnhandledCommand.COMMAND_NAME });
  }
}

class HandledCommand extends Command {
  static readonly COMMAND_NAME = "handled.command";

  constructor() {
    super({ commandName: HandledCommand.COMMAND_NAME });
  }
}

class MyCommandHandler implements CommandHandler<HandledCommand> {
  subscribedTo() {
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
    const containerScopeCreator = ContainerScopeCreatorMother.create();
    const unhandledCommand = new UnhandledCommand();
    const commandBus = new InMemoryCommandBus({
      containerScopeCreator,
    });

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
    const container = ContainerMother.createRegisteringClasses([
      MyCommandHandler,
    ]);

    const containerScopeCreator =
      ContainerScopeCreatorMother.createWithContainer(container);
    const handledCommand = new HandledCommand();
    const myCommandHandler = new MyCommandHandler();

    const commandBus = new InMemoryCommandBus({
      containerScopeCreator,
    });

    commandBus.addHandlers([myCommandHandler]);

    await commandBus.dispatch(handledCommand);
  });
});
