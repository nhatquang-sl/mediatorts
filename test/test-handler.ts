import { delay } from '../src/utilities';
import { RegisterHandler, ICommandHandler, ICommand } from '../src';

export class TestCommand implements ICommand {
  constructor(partyId: number) {
    this.partyId = partyId;
  }
  declare partyId: number;
}

@RegisterHandler
export class TestCommandHandler implements ICommandHandler<TestCommand, string> {
  async handle(command: TestCommand): Promise<string> {
    await delay(0);
    return `message from TestCommandHandler with partyId: ${command.partyId}`;
  }
}
