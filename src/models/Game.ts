import IGame from '@src/types/interfaces/IGame';
import IPlayer from '@src/types/interfaces/IPlayer';

export default class Game implements IGame {
  public readonly firstPlayer: IPlayer;
  public readonly secondPlayer: IPlayer;

  public constructor(firstPlayer: IPlayer, secondPlayer: IPlayer) {
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
  }
}