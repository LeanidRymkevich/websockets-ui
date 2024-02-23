import WebSocket, { RawData } from 'ws';

import IController from '@src/types/interfaces/IController';
import ERespType from '@src/types/enums/ERespTypes';

import PersonalController from '@src/controllers/PersonalController';
import GameRoomController from '@src/controllers/GameRoomController';
import CommonController from '@src/controllers/CommonController';
import IData from '@src/types/interfaces/IData';
import { parseRawData } from '@src/utils/data_parser';
import ITypedController from '@src/types/interfaces/ITypedController';
import { extractErrorMsg } from '@src/utils/error_util';

export default class Controller implements IController {
  private static readonly instance: IController = new Controller();

  private readonly commands: Record<ERespType, ITypedController> = {
    [ERespType.PERSONAL]: new PersonalController(),
    [ERespType.GAME_ROOM]: new GameRoomController(),
    [ERespType.COMMON]: new CommonController(),
  };

  private constructor() {}

  public static getInstance = (): IController => this.instance;

  public execute = (
    data: RawData,
    socketMap: Record<string, WebSocket>,
    socketId: string
  ): void => {
    const parsedData: IData = parseRawData(data);
    const controllerName: string | undefined = this.findCommand(
      parsedData.type
    );

    try {
      if (!controllerName)
        throw new Error(`Command type '${parsedData.type}' doesn't exists!`);

      this.commands[controllerName as ERespType].execute(
        parsedData,
        socketMap,
        socketId
      );
    } catch (err) {
      const msg = extractErrorMsg(err, 'unknown error');
      const socket: WebSocket | undefined = socketMap[socketId];

      if (!socket) return;
      socket.send(JSON.stringify({ error: true, errorText: msg }));
    }
  };

  private findCommand = (commandName: string): string | undefined => {
    return Object.keys(this.commands).find((key: string): boolean =>
      this.commands[key as ERespType].haveCommand(commandName)
    );
  };
}
