import WebSocket from 'ws';

import EPersonalRespTypes from '@src/types/enums/EPersonalRespTypes';
import IData from '@src/types/interfaces/IData';
import { TypedCommand } from '@src/types/types';
import ITypedController from '@src/types/interfaces/ITypedController';

import AbstractController from '@src/controllers/AbstractController';

import { commands } from '@src/controllers/PersonalController/commands_map';

export default class PersonalController
  extends AbstractController<EPersonalRespTypes, TypedCommand>
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
