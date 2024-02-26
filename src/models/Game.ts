import { randomUUID } from 'crypto';
import EventEmitter from 'events';

import IGame from '@src/types/interfaces/IGame';
import IPlayer from '@src/types/interfaces/IPlayer';
import EGameEvents from '@src/types/enums/EGameEvents';
import EPlayerEvents from '@src/types/enums/EPlayerEvents';
import EGameRoomRespTypes from '@src/types/enums/EGameRoomRespTypes';
import IAddShipsData from '@src/types/interfaces/IAddShipsData';
import IShip from '@src/types/interfaces/IShip';
import ICoordinate from '@src/types/interfaces/ICoordinates';
import IAttackResult from '@src/types/interfaces/IAttackResult';

import GameInnerController from '@src/controllers/GameInnerController';
import { estimateShoot, getShipsLocation } from '@src/utils/battlefield_helper';
import IGameInnerController from '@src/types/interfaces/IGameInnerController';

export default class Game extends EventEmitter implements IGame {
  public readonly firstPlayer: IPlayer;
  public readonly secondPlayer: IPlayer;
  public readonly gameId: string = randomUUID();

  private readonly controller: IGameInnerController =
    GameInnerController.getInstance();

  private winner: IPlayer | null = null;
  private firstPlayerShipsInfo: IAddShipsData | null = null;
  private secondPlayerShipsInfo: IAddShipsData | null = null;
  private firstRemainShip: IShip[] | null = null;
  private secondRemainShip: IShip[] | null = null;
  private isFirstPlayerTurn = true;
  private lastAttackRes: IAttackResult | null = null;

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
  public getIsFirstPlayerTurn = (): boolean => this.isFirstPlayerTurn;
  public getLastAttackRes = (): IAttackResult | null => this.lastAttackRes;

  public setPlayerLayout = (info: IAddShipsData): IShip[] => {
    const { indexPlayer, ships } = info;
    const layout: IShip[] = getShipsLocation(ships);

    if (indexPlayer === this.firstPlayer.index) {
      this.firstRemainShip = layout;
      this.firstPlayerShipsInfo = info;
    } else if (indexPlayer === this.secondPlayer.index) {
      this.secondRemainShip = layout;
      this.secondPlayerShipsInfo = info;
    } else {
      throw new Error('No user in game with provided id');
    }

    if (this.firstRemainShip && this.secondRemainShip) {
      this.controller.execute(EGameRoomRespTypes.START_GAME, this);
      this.controller.execute(EGameRoomRespTypes.TURN, this);
    }

    return layout;
  };

  public attack = (coord: ICoordinate): void => {
    let ships: IShip[];

    if (this.isFirstPlayerTurn) {
      ships = this.secondRemainShip!;
    } else {
      ships = this.firstRemainShip!;
    }

    this.lastAttackRes = estimateShoot(coord, ships);

    if (this.isFirstPlayerTurn) {
      this.secondRemainShip = this.lastAttackRes.newShips;
    } else {
      this.firstRemainShip = this.lastAttackRes.newShips;
    }

    if (this.lastAttackRes.status === 'miss') {
      this.isFirstPlayerTurn = false;
    } else if (this.lastAttackRes.status === 'shot') {
      this.isFirstPlayerTurn = true;
    } else {
      this.isFirstPlayerTurn = true;
    }

    if (!this.firstRemainShip!.length) {
      this.winner = this.secondPlayer;
      this.finish();
    }

    if (!this.secondRemainShip!.length) {
      this.winner = this.firstPlayer;
      this.finish();
    }
  };

  private finish = (): void => {
    this.controller.execute(EGameRoomRespTypes.FINISH, this);
    this.firstPlayer.removeAllListeners();
    this.secondPlayer.removeAllListeners();
    this.emit(EGameEvents.FINISH, this);
  };

  private onPlayerLeave = (player: IPlayer): void => {
    this.winner =
      player === this.firstPlayer ? this.secondPlayer : this.firstPlayer;
    this.finish();
  };
}
