import ICoordinate from '@src/types/interfaces/ICoordinates';
import { AttackStatus } from '@src/types/types';

export default interface IAttackResult {
  position: ICoordinate;
  status: AttackStatus;
  newLocations: ICoordinate[][];
}
