import { container } from './container';
import { ICommand, ICommandHandler, ICommandValidator, IPipelineBehavior } from './interfaces';

export class Mediator {
  private pipelineBehaviors: IPipelineBehavior[] = [];

  public addPipelineBehavior(pipelineBehavior: IPipelineBehavior): void {
    this.pipelineBehaviors.push(pipelineBehavior);
  }

  private async executePipeline(
    i: number,
    command: ICommand,
    next: () => Promise<any>
  ): Promise<any> {
    const behaviors = this.pipelineBehaviors;
    if (i == 0) return await next();
    const behavior = async () => await behaviors[i - 1].handle(command, next);
    return await this.executePipeline(i - 1, command, behavior);
  }

  public async send<TResult>(command: ICommand): Promise<TResult> {
    const cmdName = command.constructor.name;
    const handlerClass: any = container.handlers[`${cmdName}Handler`];
    const handler: ICommandHandler<ICommand, TResult> = new handlerClass();

    const validatorClass: any = container.validators[`${cmdName}Validator`];

    const behaviors = this.pipelineBehaviors;
    const next = async () => {
      if (validatorClass) {
        const validator: ICommandValidator<ICommand> = new validatorClass();
        await validator.validate(command);
      }
      return await handler.handle(command);
    };
    return await this.executePipeline(behaviors.length, command, next);
  }
}

export const mediator = new Mediator();
