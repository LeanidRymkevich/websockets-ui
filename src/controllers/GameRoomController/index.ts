import WebSocket from 'ws';

import IData from '@src/types/interfaces/IData';
import ITypedController from '@src/types/interfaces/ITypedController';
import EGameRoomRespTypes from '@src/types/enums/EGameRoomRespTypes';

import AbstractController from '@src/controllers/AbstractController';

import { commands } from '@src/controllers/GameRoomController/commands_map';

export default class GameRoomController
  // eslint-disable-next-line @typescript-eslint/ban-types
  extends AbstractController<EGameRoomRespTypes, Function>
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
    this.commands[data.type as EGameRoomRespTypes](data, socketMap, socketId);
  };
}
