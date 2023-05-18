# TypeScript Mediator Pattern with Command and Query Responsibility Segregation (CQRS)

This project implements the Mediator pattern along with the CQRS pattern in TypeScript.

## Files

### interfaces.ts

This file contains the interfaces and types used throughout the application, which includes:

- `ICommand`: The base interface for commands.
- `AuthorizeCommand`: An example implementation of the `ICommand` interface.
- `ICommandHandler`: Interface for command handlers.
- `ICommandValidator`: Interface for command validators.
- `IContainer`: Interface for the container, which holds handlers and validators.
- `IPipelineBehavior`: Interface for defining the pipeline behavior.

### mediator.ts

This file contains the `Mediator` class which manages and routes commands to their appropriate handlers. The mediator also executes any pipeline behaviors before processing the command. 

### container.ts

The container file is a simple Dependency Injection container which stores instances of handlers and validators. It also contains decorators to register handlers and validators to the container:

- `RegisterHandler`: A decorator to register a handler class to the container.
- `RegisterValidator`: A decorator to register a validator class to the container.
- `Authorize`: A decorator to add an authorization mechanism to the handlers. This decorator can be used on classes to add a list of authorized roles.

## Usage

In this example, we'll create a `SumCommand` and a `SumCommandHandler` to calculate the sum of two numbers.

First, define the `SumCommand`:
```typescript
// This could be in your commands.ts file
export class SumCommand implements ICommand {
  constructor(public num1: number, public num2: number) {}
}
```

Next, define the SumCommandHandler:
```typescript
import { ICommandHandler } from './interfaces';
import { RegisterHandler } from './container';
import { SumCommand } from './commands';

// This could be in your handlers.ts file
@RegisterHandler
export class SumCommandHandler implements ICommandHandler<SumCommand, number> {
  async handle(command: SumCommand): Promise<number> {
    return command.num1 + command.num2;
  }
}
```

Finally, you can use the SumCommand and SumCommandHandler like this:
```typescript
// Import mediator from mediator.ts file
import { mediator } from './mediator';
import { SumCommand } from './commands';

async function calculateSum() {
  const command = new SumCommand(3, 5);
  const result = await mediator.send<number>(command);
  console.log(`The sum is ${result}`);
}

calculateSum();
```

## Publish packages to npm
- `npm login`
- `npm init --scope=@@qnn92`: init organization-scoped package
- `npm publish --access public`: publish package