import EventEmitter from 'events';

import IPlayer from '@src/types/interfaces/IPlayer';
import IRoom from '@src/types/interfaces/IRoom';
import ERoomEvent from '@src/types/enums/ERoomEvent';
import EPlayerEvents from '@src/types/enums/EPlayerEvents';
import IGame from '@src/types/interfaces/IGame';
import EGameRoomRespTypes from '@src/types/enums/EGameRoomRespTypes';

import Game from '@src/models/Game';
import GameInnerController from '@src/controllers/GameInnerController';

export default class Room extends EventEmitter implements IRoom {
  public readonly roomId: string;

  private firstPlayer: IPlayer | null = null;
  private secondPlayer: IPlayer | null = null;
  private game: IGame | null = null;

  public constructor(id: string) {
    super();
    this.roomId = id;
    this.on(ERoomEvent.FILL, this.onRoomFill);
  }

  public getFirstPlayer = (): IPlayer | null => this.firstPlayer;
  public getSecondPlayer = (): IPlayer | null => this.secondPlayer;
  public getGame = (): IGame | null => this.game;

  public addPlayer = (player: IPlayer): IPlayer => {
    if (!this.firstPlayer) {
      this.firstPlayer = player;
      this.firstPlayer.on(
        EPlayerEvents.LEAVE,
        (): null => (this.firstPlayer = null)
      );
    } else {
      this.secondPlayer = player;
      this.secondPlayer.on(
        EPlayerEvents.LEAVE,
        (): null => (this.firstPlayer = null)
      );
      this.emit(ERoomEvent.FILL, this);
    }

    return player;
  };

  public close = (): boolean => this.emit(ERoomEvent.CLOSE, this);

  private onRoomFill = (): void => {
    const game: IGame = new Game(this.firstPlayer!, this.secondPlayer!);

    GameInnerController.getInstance().execute(
      EGameRoomRespTypes.CREATE_GAME,
      game
    );
    this.game = game;
  };
}
