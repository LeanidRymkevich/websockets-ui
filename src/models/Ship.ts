import ICoordinate from '@src/types/interfaces/ICoordinates';
import { AttackStatus } from '@src/types/types';
import IShip from '@src/types/interfaces/IShip';

import { MAX_SELL_NUM, MIN_SELL_NUM } from '@src/constants';

export default class Ship implements IShip {
  private readonly coordsMap: Map<ICoordinate, boolean>;

  private isKilled: boolean = false;
  private sellsLeft: number;

  public constructor(coords: ICoordinate[]) {
    this.coordsMap = new Map(
      coords.map((coord: ICoordinate): [ICoordinate, boolean] => {
        return [coord, false];
      })
    );
    this.sellsLeft = coords.length;
  }

  public checkShootCons = (coord: ICoordinate): AttackStatus => {
    const record: boolean | undefined = this.coordsMap.get(coord);

    if (record === undefined || record) return 'miss';

    if (record === false) {
      this.coordsMap.set(coord, true);
      this.sellsLeft--;
    }

    if (!this.sellsLeft) {
      this.isKilled = true;
      return 'killed';
    }

    this.isKilled = false;
    return 'shot';
  };

  public getIsKilled = (): boolean => this.isKilled;

  public getCellsAround = (): ICoordinate[] => {
    const result: ICoordinate[] = [];

    for (const cell of this.coordsMap.keys()) {
      const { x, y } = cell;
      const upperSell: ICoordinate = { x, y: y - 1 };
      const lowerSell: ICoordinate = { x, y: y + 1 };
      const leftSell: ICoordinate = { x: x - 1, y };
      const rightSell: ICoordinate = { x: x + 1, y };

      if (!this.coordsMap.has(upperSell) && upperSell.y >= MIN_SELL_NUM)
        result.push(upperSell);
      if (!this.coordsMap.has(lowerSell) && upperSell.y <= MAX_SELL_NUM)
        result.push(lowerSell);
      if (!this.coordsMap.has(leftSell) && upperSell.x >= MIN_SELL_NUM)
        result.push(leftSell);
      if (!this.coordsMap.has(rightSell) && upperSell.y <= MAX_SELL_NUM)
        result.push(rightSell);
    }

    return result;
  };
}
