import EventEmitter from 'events';

import IPlayer from '@src/types/interfaces/IPlayer';
import IGame from '@src/types/interfaces/IGame';

export default interface IRoom extends EventEmitter {
  readonly roomId: string;

  getFirstPlayer: () => IPlayer | null;
  getSecondPlayer: () => IPlayer | null;
  getGame: () => IGame | null;

  addPlayer: (player: IPlayer) => IPlayer;

  close: () => boolean;
}
