import IAddShipsData from '@src/types/interfaces/IAddShipsData';
import IAttackResult from '@src/types/interfaces/IAttackResult';
import ICoordinate from '@src/types/interfaces/ICoordinates';
import { AttackStatus } from '@src/types/types';

const getShipsLocation = ({ ships }: IAddShipsData): ICoordinate[][] => {
  const result: ICoordinate[][] = [];

  for (const ship of ships) {
    const positions: ICoordinate[] = [];
    const { position, length, direction } = ship;
    positions.push(position);

    if (length <= 1) {
      result.push(positions);
      continue;
    }

    for (let i = 1; i < length; i++) {
      if (direction) {
        positions.push({ x: position.x, y: position.y + i });
      } else {
        positions.push({ x: position.x + i, y: position.y });
      }
    }
    result.push(positions);
  }

  return result;
};

const estimateShoot = (
  coord: ICoordinate,
  locations: ICoordinate[][]
): IAttackResult => {
  const newLocations: ICoordinate[][] = [];
  let status: AttackStatus = 'miss';

  for (const location of locations) {
    const newLocation: ICoordinate[] = location.filter(
      (position: ICoordinate): boolean => {
        const { x, y } = position;
        if (x === coord.x && y === coord.y) return false;
        return true;
      }
    );

    if (location.length !== newLocation.length) {
      status = newLocation.length ? 'shot' : 'killed';
      if (status === 'shot') newLocations.push(newLocation);
      continue;
    }

    newLocations.push(newLocation);
  }

  return {
    position: coord,
    status,
    newLocations,
  };
};

export { getShipsLocation, estimateShoot };
