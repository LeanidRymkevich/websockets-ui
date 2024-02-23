import { IPlayerParams } from '../types';
import { IPlayer } from './IPlayer';

export default interface IPlayersStorage {
  addPlayer: (playerParams: IPlayerParams) => IPlayer;
}
