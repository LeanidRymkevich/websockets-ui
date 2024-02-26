import { IPlayerParams } from '@src/types/types';
import IPlayer from '@src/types/interfaces/IPlayer';

export default interface IPlayersStorage {
  addPlayer: (playerParams: IPlayerParams) => IPlayer;
  getPlayerBySocketId: (id: string) => IPlayer | null;
}
