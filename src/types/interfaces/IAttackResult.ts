import ICoordinate from '@src/types/interfaces/ICoordinates';
import { AttackStatus } from '@src/types/types';
import IShip from '@src/types/interfaces/IShip';

export default interface IAttackResult {
  position: ICoordinate;
  status: AttackStatus;
  newShips: IShip[];
  killedShip: IShip | null;
}
