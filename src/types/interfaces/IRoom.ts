import IPlayer from '@src/types/interfaces/IPlayer';
import EventEmitter from 'events';

export default interface IRoom extends EventEmitter {
  readonly roomId: string;
  addSecondPlayer: (player: IPlayer) => IPlayer;
  getFirstPlayer: () => IPlayer;
  getSecondPlayer: () => IPlayer | null;
  close: () => boolean;
}
