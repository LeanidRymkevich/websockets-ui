import IGame from '@src/types/interfaces/IGame';

export default interface IGamesStorage {
  addGame: (game: IGame) => IGame;
  getGame: (gameId: string) => IGame | null;
}
