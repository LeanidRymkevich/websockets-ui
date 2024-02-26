import { AttackStatus } from '@src/types/types';
import IAttackResult from '@src/types/interfaces/IAttackResult';
import ICoordinate from '@src/types/interfaces/ICoordinates';
import IShipPosition from '@src/types/interfaces/IShipPosition';
import IShip from '@src/types/interfaces/IShip';

import Ship from '@src/models/Ship';

const getShipsLocation = (ships: IShipPosition[]): IShip[] => {
  const result: IShip[] = [];

  for (const ship of ships) {
    const positions: ICoordinate[] = [];
    const { position, length, direction } = ship;
    positions.push(position);

    if (length <= 1) {
      result.push(new Ship(positions));
      continue;
    }

    for (let i = 1; i < length; i++) {
      if (direction) {
        positions.push({ x: position.x, y: position.y + i });
      } else {
        positions.push({ x: position.x + i, y: position.y });
      }
    }
    result.push(new Ship(positions));
  }

  return result;
};

const estimateShoot = (coord: ICoordinate, ships: IShip[]): IAttackResult => {
  const newShips: IShip[] = ships;
  let status: AttackStatus = 'miss';
  let killedShip: IShip | null = null;

  for (let i = 0; i < ships.length; i++) {
    const ship: IShip = ships[i]!;

    status = ship.checkShootCons(coord);
    if (status === 'shot') break;
    if (status === 'killed') {
      newShips.splice(i, 1);
      killedShip = ship;
    }
  }

  return {
    position: coord,
    status,
    newShips,
    killedShip,
  };
};

export { getShipsLocation, estimateShoot };
