import EGameRoomRespTypes from '@src/types/enums/EGameRoomRespTypes';
import { GameInnerCommand } from '@src/types/types';
import IGame from '@src/types/interfaces/IGame';
import IGameInnerController from '@src/types/interfaces/IGameInnerController';

import { commands } from '@src/controllers/GameInnerController/commands_map';

export default class GameInnerController implements IGameInnerController {
  private static readonly instance: IGameInnerController =
    new GameInnerController();

  private readonly commands: Record<EGameRoomRespTypes, GameInnerCommand> =
    commands;

  private constructor() {}

  public static getInstance = (): IGameInnerController => this.instance;

  public execute = (command: EGameRoomRespTypes, game: IGame): void => {
    this.commands[command](game);
  };
}
