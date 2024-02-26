import EventEmitter from 'events';

import IPlayer from '@src/types/interfaces/IPlayer';
import IAddShipsData from '@src/types/interfaces/IAddShipsData';
import IShip from '@src/types/interfaces/IShip';
import IAttackResult from '@src/types/interfaces/IAttackResult';
import ICoordinate from '@src/types/interfaces/ICoordinates';

export default interface IGame extends EventEmitter {
  readonly firstPlayer: IPlayer;
  readonly secondPlayer: IPlayer;
  readonly gameId: string;

  getWinner: () => IPlayer | null;
  getFirstPlayerShipsInfo: () => IAddShipsData | null;
  getSecondPlayerShipsInfo: () => IAddShipsData | null;
  getIsFirstPlayerTurn: () => boolean;
  getLastAttackRes: () => IAttackResult | null;

  attack: (coord: ICoordinate) => void;
  setPlayerLayout: (info: IAddShipsData) => IShip[];
}
