import IData from '@src/types/interfaces/IData';
import IGame from '@src/types/interfaces/IGame';

import CustomDB from '@src/data/CustomDB';

import { getAddShipsData } from '@src/utils/data_parser';

const addShips = (data: IData): void => {
  const { gameId, indexPlayer, ships } = getAddShipsData(data);
  const game: IGame | null =
    CustomDB.getInstance().gamesStorage.getGame(gameId);

  if (!game) throw new Error(`There is no game with ${gameId} in db`);

  console.log(gameId, indexPlayer, ships);
};

export { addShips };
