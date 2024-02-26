import { TypedCommand } from '@src/types/types';

export default interface ITypedController {
  execute: TypedCommand;
  haveCommand(commandName: string): boolean;
}
