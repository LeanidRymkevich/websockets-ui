import IData from '@src/types/interfaces/IData';
import ITypedController from '@src/types/interfaces/ITypedController';
import AbstractController from '@src/controllers/AbstractController';
import ECommonRespTypes from '@src/types/enums/ECommonRespTypes';
import WebSocket from 'ws';

// TODO: add appropriate type
// eslint-disable-next-line @typescript-eslint/ban-types
const commands: Record<ECommonRespTypes, Function> = {
  [ECommonRespTypes.UPDATE_ROOM]: () =>
    console.log(ECommonRespTypes.UPDATE_ROOM),
  [ECommonRespTypes.UPDATE_WINNERS]: () =>
    console.log(ECommonRespTypes.UPDATE_WINNERS),
};

export default class CommonController
  // eslint-disable-next-line @typescript-eslint/ban-types
  extends AbstractController<ECommonRespTypes, Function>
  implements ITypedController
{
  public constructor() {
    super(commands);
  }

  public execute = (data: IData, socket: WebSocket): void => {
    this.commands[data.type as ECommonRespTypes](data, socket);
  };
}
