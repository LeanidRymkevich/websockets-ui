import { ShipSize } from '@src/types/types';

export default interface IShipPosition {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: ShipSize;
}
