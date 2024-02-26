import EventEmitter from 'events';

import IPlayer from '@src/types/interfaces/IPlayer';
import ICoordinate from '@src/types/interfaces/ICoordinates';
import IAddShipsData from '@src/types/interfaces/IAddShipsData';

export default interface IGame extends EventEmitter {
  readonly firstPlayer: IPlayer;
  readonly secondPlayer: IPlayer;
  readonly gameId: string;

  getWinner: () => IPlayer | null;
  getFirstPlayerShipsInfo: () => IAddShipsData | null;
  getSecondPlayerShipsInfo: () => IAddShipsData | null;

  setPlayerLayout: (info: IAddShipsData) => ICoordinate[][];
}
