import IData from '@src/types/interfaces/IData';
import ITypedController from '@src/types/interfaces/ITypedController';

export default class CommonController implements ITypedController {
  haveCommand(commandName: string): boolean {
    throw new Error('Method not implemented.');
  }
  public execute = (data: IData): void => {
    console.log(data);
  };
}
