import IGame from '@src/types/interfaces/IGame';
import IGamesStorage from '@src/types/interfaces/IGamesStorage';

export default class GamesStorage implements IGamesStorage {
  private readonly storage: Record<string, IGame> = {};

  public addGame = (game: IGame): IGame => {
    this.storage[game.gameId] = game;

    return game;
  };
}
