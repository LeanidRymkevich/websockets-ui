import IPlayer from '@src/types/interfaces/IPlayer';
import Game from './Game';
import IRoom from '@src/types/interfaces/IRoom';
import EventEmitter from 'events';
import ERoomEvent from '@src/types/enums/ERoomEvent';
import EPlayerEvents from '@src/types/enums/EPlayerEvents';

export default class Room extends EventEmitter implements IRoom {
  public readonly roomId: string;

  private firstPlayer: IPlayer | null = null;
  private secondPlayer: IPlayer | null = null;
  private game: Game | null = null;

  public constructor(id: string) {
    super();
    this.roomId = id;
  }

  public getFirstPlayer = (): IPlayer | null => this.firstPlayer;
  public getSecondPlayer = (): IPlayer | null => this.secondPlayer;

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

  public createGame = (): Game => {
    if (!this.secondPlayer || !this.firstPlayer)
      throw new Error('One or two players are missing in the room!');
    if (!this.game) {
      this.game = new Game(this.firstPlayer, this.secondPlayer);
    }
    return this.game;
  };

  public close = (): boolean => this.emit(ERoomEvent.CLOSE, this);
}
