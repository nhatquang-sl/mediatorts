import { container, mediator } from '../src';
import { TestCommand } from './test-handler';

test('register handler success', async () => {
  let result = await mediator.send<string>(new TestCommand(1));
  expect(result).toEqual(`message from TestCommandHandler with partyId: 1`);
  expect(container.handlers['TestCommandHandler']).not.toBeNull();
});
