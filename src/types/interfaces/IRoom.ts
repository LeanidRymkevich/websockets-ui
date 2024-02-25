import IPlayer from '@src/types/interfaces/IPlayer';
import EventEmitter from 'events';

export default interface IRoom extends EventEmitter {
  readonly roomId: string;
  addPlayer: (player: IPlayer) => IPlayer;
  getFirstPlayer: () => IPlayer | null;
  getSecondPlayer: () => IPlayer | null;
  close: () => boolean;
}
