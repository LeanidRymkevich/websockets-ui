import IPlayer from '@src/types/interfaces/IPlayer';

export default interface IGame {
  readonly firstPlayer: IPlayer;
  readonly secondPlayer: IPlayer;
  readonly gameId: string;
}
