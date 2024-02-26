import EGameEvents from '@src/types/enums/EGameEvents';
import IGame from '@src/types/interfaces/IGame';
import IGamesStorage from '@src/types/interfaces/IGamesStorage';

export default class GamesStorage implements IGamesStorage {
  private readonly storage: Record<string, IGame> = {};

  public addGame = (game: IGame): IGame => {
    this.storage[game.gameId] = game;

    game.on(EGameEvents.FINISH, (): void => {
      delete this.storage[game.gameId];
    });

    return game;
  };

  public getGame = (gameId: string): IGame | null => {
    return this.storage[gameId] || null;
  };
}
