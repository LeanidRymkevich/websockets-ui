import EventEmitter from 'events';

import IPlayer from '@src/types/interfaces/IPlayer';

export default interface IGame extends EventEmitter {
  readonly firstPlayer: IPlayer;
  readonly secondPlayer: IPlayer;
  readonly gameId: string;

  getWinner: () => IPlayer | null;
}
