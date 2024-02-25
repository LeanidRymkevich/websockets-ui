import WebSocket from 'ws';

import ECommonRespTypes from '@src/types/enums/ECommonRespTypes';
import ICommonController from '@src/types/interfaces/ICommonController';
import { CommonCommand } from '@src/types/types';

import { commands } from '@src/controllers/CommonController/commands_map';

export default class CommonController implements ICommonController {
  private static readonly instance: ICommonController = new CommonController();

  private readonly commands: Record<ECommonRespTypes, CommonCommand> = commands;

  private constructor() {}

  public static getInstance = (): ICommonController => this.instance;

  public execute = (command: ECommonRespTypes, socket: WebSocket): void => {
    this.commands[command](socket);
  };
}
