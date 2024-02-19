import EPersonalRespTypes from '@src/types/enums/EPersonalRespTypes';
import IData from '@src/types/interfaces/IData';
import ITypedController from '@src/types/interfaces/ITypedController';
import AbstractController from './AbstractController';
import WebSocket from 'ws';

// TODO: add appropriate type
// eslint-disable-next-line @typescript-eslint/ban-types
const commands: Record<EPersonalRespTypes, Function> = {
  [EPersonalRespTypes.ADD_USER_TO_ROOM]: () =>
    console.log(EPersonalRespTypes.ADD_USER_TO_ROOM),
  [EPersonalRespTypes.CREATE_ROOM]: () =>
    console.log(EPersonalRespTypes.CREATE_ROOM),
  [EPersonalRespTypes.REGISTRATION]: () =>
    console.log(EPersonalRespTypes.REGISTRATION),
};

export default class PersonalController
  // eslint-disable-next-line @typescript-eslint/ban-types
  extends AbstractController<EPersonalRespTypes, Function>
  implements ITypedController
{
  public constructor() {
    super(commands);
  }

  public execute = (
    data: IData,
    socketMap: Record<string, WebSocket>,
    socketId: string
  ): void => {
    this.commands[data.type as EPersonalRespTypes](data, socketMap, socketId);
  };
}
