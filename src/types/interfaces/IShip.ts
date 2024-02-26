import { AttackStatus } from '@src/types/types';
import ICoordinate from '@src/types/interfaces/ICoordinates';

export default interface IShip {
  checkShootCons: (coord: ICoordinate) => AttackStatus;
  getIsKilled: () => boolean;
  getCellsAround: () => ICoordinate[];
}
