import IData from '@src/types/interfaces/IData';
import ITypedController from '@src/types/interfaces/ITypedController';
import AbstractController from '@src/controllers/AbstractController';
import EGameRoomRespTypes from '@src/types/enums/EGameRoomRespTypes';
import WebSocket from 'ws';

// TODO: add appropriate type
// eslint-disable-next-line @typescript-eslint/ban-types
const commands: Record<EGameRoomRespTypes, Function> = {
  [EGameRoomRespTypes.CREATE_GAME]: () =>
    console.log(EGameRoomRespTypes.CREATE_GAME),
  [EGameRoomRespTypes.ADD_SHIPS]: () =>
    console.log(EGameRoomRespTypes.ADD_SHIPS),
  [EGameRoomRespTypes.START_GAME]: () =>
    console.log(EGameRoomRespTypes.START_GAME),
  [EGameRoomRespTypes.ATTACK]: () => console.log(EGameRoomRespTypes.ATTACK),
  [EGameRoomRespTypes.RANDOM_ATTACK]: () =>
    console.log(EGameRoomRespTypes.RANDOM_ATTACK),
  [EGameRoomRespTypes.TURN]: () => console.log(EGameRoomRespTypes.TURN),
  [EGameRoomRespTypes.FINISH]: () => console.log(EGameRoomRespTypes.FINISH),
};

export default class GameRoomController
  // eslint-disable-next-line @typescript-eslint/ban-types
  extends AbstractController<EGameRoomRespTypes, Function>
  implements ITypedController
{
  public constructor() {
    super(commands);
  }

  public execute = (data: IData, socket: WebSocket): void => {
    this.commands[data.type as EGameRoomRespTypes](data, socket);
  };
}
