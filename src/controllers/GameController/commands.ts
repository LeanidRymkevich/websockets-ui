import IData from '@src/types/interfaces/IData';
import IGame from '@src/types/interfaces/IGame';
import IAddShipsData from '@src/types/interfaces/IAddShipsData';
import ICoordinate from '@src/types/interfaces/ICoordinates';

import CustomDB from '@src/data/CustomDB';

import {
  getAddShipsData,
  getAttackData,
  getRandomAttackData,
} from '@src/utils/data_parser';
import { randomNum } from '@src/utils/random';
import { MAX_SELL_NUM, MIN_SELL_NUM } from '@src/constants';
import EGameRoomReqTypes from '@src/types/enums/EGameRoomReqTypes';

const addShips = (data: IData): void => {
  const info: IAddShipsData = getAddShipsData(data);
  const game: IGame | null = CustomDB.getInstance().gamesStorage.getGame(
    info.gameId
  );

  if (!game) throw new Error(`There is no game with ${info.gameId} in db`);

  game.setPlayerLayout(info);
};

const attack = (data: IData): void => {
  const { gameId, x, y } = getAttackData(data);
  const game: IGame | null =
    CustomDB.getInstance().gamesStorage.getGame(gameId);

  if (!game) throw new Error(`There is no game with ${gameId} in db`);

  game.attack({ x, y });
};

const randomAttack = (data: IData): void => {
  const { gameId, indexPlayer } = getRandomAttackData(data);
  const randomCoords: ICoordinate = {
    x: randomNum(MIN_SELL_NUM, MAX_SELL_NUM),
    y: randomNum(MIN_SELL_NUM, MAX_SELL_NUM),
  };

  attack({
    type: EGameRoomReqTypes.RANDOM_ATTACK,
    data: {
      gameId,
      indexPlayer,
      ...randomCoords,
    },
    id: 0,
  });
};

export { addShips, attack, randomAttack };
