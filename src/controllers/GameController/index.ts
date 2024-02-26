import WebSocket from 'ws';

import IData from '@src/types/interfaces/IData';
import ITypedController from '@src/types/interfaces/ITypedController';
import EGameRoomReqTypes from '@src/types/enums/EGameRoomReqTypes';
import { TypedCommand } from '@src/types/types';

import AbstractController from '@src/controllers/AbstractController';

import { commands } from '@src/controllers/GameController/commands_map';

export default class GameController
  extends AbstractController<EGameRoomReqTypes, TypedCommand>
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
    this.commands[data.type as EGameRoomReqTypes](data, socketMap, socketId);
  };
}
