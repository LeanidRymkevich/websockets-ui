import IPlayer from '@src/types/interfaces/IPlayer';

export default interface IRoom {
  readonly roomId: string;
  addSecondPlayer: (player: IPlayer) => IPlayer;
  getFirstPlayer: () => IPlayer;
  getSecondPlayer: () => IPlayer | null;
}
