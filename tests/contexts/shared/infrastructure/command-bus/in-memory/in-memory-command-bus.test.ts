import { Command } from "../../../../../../src/contexts/shared/domain/command";
import { CommandHandler } from "../../../../../../src/contexts/shared/domain/command-handler";
import { CommandNotRegisteredError } from "../../../../../../src/contexts/shared/domain/errors/command-not-registered-error";
import { CommandHandlersInformation } from "../../../../../../src/contexts/shared/infrastructure/command-bus/in-memory/command-handlers-information";
import { InMemoryCommandBus } from "../../../../../../src/contexts/shared/infrastructure/command-bus/in-memory/in-memory-command-bus";
import { LoggerMother } from "../../../domain/logger-mother";
import { ScopeHandlerMother } from "../../../domain/scope-handler-mother";
import { ContainerMother } from "../../../domain/container-mother";
import { DependencyInjection } from "../../../../../../src/apps/backoffice/backend/dependency-injection/dependency-injection";

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
    const scopeHandler = ScopeHandlerMother.create();
    const unhandledCommand = new UnhandledCommand();
    const commandHandlersInformation = new CommandHandlersInformation({
      scopeHandler,
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
    const container = ContainerMother.create();

    container.register({
      myCommandHandler: DependencyInjection.toolBox().asClass(MyCommandHandler),
    });

    const scopeHandler = ScopeHandlerMother.createWithContainer(container);
    const handledCommand = new HandledCommand();
    const myCommandHandler = new MyCommandHandler();
    const commandHandlersInformation = new CommandHandlersInformation({
      scopeHandler,
      commandHandlers: [myCommandHandler],
    });
    const commandBus = new InMemoryCommandBus({ commandHandlersInformation });

    await commandBus.dispatch(handledCommand);
  });
});
