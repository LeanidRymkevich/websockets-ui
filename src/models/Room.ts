import IPlayer from '@src/types/interfaces/IPlayer';
import Game from './Game';
import IRoom from '@src/types/interfaces/IRoom';

export default class Room implements IRoom {
  public readonly roomId: string;

  private firstPlayer: IPlayer;
  private secondPlayer: IPlayer | null = null;
  private game: Game | null = null;

  public constructor(firstPlayer: IPlayer, id: string) {
    this.firstPlayer = firstPlayer;
    this.roomId = id;
  }

  public getFirstPlayer = (): IPlayer => this.firstPlayer;
  public getSecondPlayer = (): IPlayer | null => this.secondPlayer;

  public addSecondPlayer = (player: IPlayer): IPlayer => {
    if (!this.secondPlayer) {
      this.secondPlayer = player;
    }
    return this.secondPlayer;
  };

  public createGame = (): Game => {
    if (!this.secondPlayer)
      throw new Error('There is no second player in this room!');
    if (!this.game) {
      this.game = new Game(this.firstPlayer, this.secondPlayer);
    }
    return this.game;
  };
}