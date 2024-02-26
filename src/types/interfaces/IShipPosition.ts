import { ShipSize } from '@src/types/types';
import ICoordinate from '@src/types/interfaces/ICoordinates';

export default interface IShipPosition {
  position: ICoordinate;
  direction: boolean;
  length: number;
  type: ShipSize;
}
