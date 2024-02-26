import { randomUUID } from 'crypto';
import EventEmitter from 'events';

import IGame from '@src/types/interfaces/IGame';
import IPlayer from '@src/types/interfaces/IPlayer';
import EGameEvents from '@src/types/enums/EGameEvents';
import EPlayerEvents from '@src/types/enums/EPlayerEvents';
import EGameRoomRespTypes from '@src/types/enums/EGameRoomRespTypes';
import ICoordinate from '@src/types/interfaces/ICoordinates';
import IAddShipsData from '@src/types/interfaces/IAddShipsData';

import GameInnerController from '@src/controllers/GameInnerController';
import { getShipsLocation } from '@src/utils/battlefield_helper';

export default class Game extends EventEmitter implements IGame {
  public readonly firstPlayer: IPlayer;
  public readonly secondPlayer: IPlayer;
  public readonly gameId: string = randomUUID();

  private winner: IPlayer | null = null;
  private firstPlayerShipsInfo: IAddShipsData | null = null;
  private secondPlayerShipsInfo: IAddShipsData | null = null;
  private firstPlayerLayout: ICoordinate[][] | null = null;
  private secondPlayerLayout: ICoordinate[][] | null = null;

  public constructor(firstPlayer: IPlayer, secondPlayer: IPlayer) {
    super();
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;

    firstPlayer.on(EPlayerEvents.LEAVE, (): void =>
      this.onPlayerLeave(firstPlayer)
    );
    secondPlayer.on(EPlayerEvents.LEAVE, (): void =>
      this.onPlayerLeave(secondPlayer)
    );
  }

  public getWinner = (): IPlayer | null => this.winner;
  public getFirstPlayerShipsInfo = (): IAddShipsData | null =>
    this.firstPlayerShipsInfo;
  public getSecondPlayerShipsInfo = (): IAddShipsData | null =>
    this.secondPlayerShipsInfo;

  public setPlayerLayout = (info: IAddShipsData): ICoordinate[][] => {
    const { indexPlayer, ships } = info;
    const layout: ICoordinate[][] = getShipsLocation(ships);

    if (indexPlayer === this.firstPlayer.index) {
      this.firstPlayerLayout = layout;
      this.firstPlayerShipsInfo = info;
    } else if (indexPlayer === this.secondPlayer.index) {
      this.secondPlayerLayout = layout;
      this.secondPlayerShipsInfo = info;
    } else {
      throw new Error('No user in game with provided id');
    }

    if (this.firstPlayerLayout && this.secondPlayerLayout) {
      GameInnerController.getInstance().execute(
        EGameRoomRespTypes.START_GAME,
        this
      );
    }

    return layout;
  };

  private finish = (): void => {
    GameInnerController.getInstance().execute(EGameRoomRespTypes.FINISH, this);
    this.emit(EGameEvents.FINISH, this);
  };

  private onPlayerLeave = (player: IPlayer): void => {
    this.winner =
      player === this.firstPlayer ? this.secondPlayer : this.firstPlayer;
    this.winner.removeAllListeners();
    this.finish();
  };
}
