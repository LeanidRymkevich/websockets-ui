import { randomUUID } from 'crypto';
import EventEmitter from 'events';

import IGame from '@src/types/interfaces/IGame';
import IPlayer from '@src/types/interfaces/IPlayer';
import EGameEvents from '@src/types/enums/EGameEvents';
import EPlayerEvents from '@src/types/enums/EPlayerEvents';
import EGameRoomRespTypes from '@src/types/enums/EGameRoomRespTypes';

import GameInnerController from '@src/controllers/GameInnerController';

export default class Game extends EventEmitter implements IGame {
  public readonly firstPlayer: IPlayer;
  public readonly secondPlayer: IPlayer;
  public readonly gameId: string = randomUUID();

  private winner: IPlayer | null = null;

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

  private finish = (): void => {
    GameInnerController.getInstance().execute(EGameRoomRespTypes.FINISH, this);
    this.emit(EGameEvents.FINISH, this);
  };

  private onPlayerLeave = (player: IPlayer): void => {
    this.winner =
      player === this.firstPlayer ? this.secondPlayer : this.firstPlayer;
    this.finish();
  };
}
