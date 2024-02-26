import IData from '@src/types/interfaces/IData';
import IGame from '@src/types/interfaces/IGame';
import IAddShipsData from '@src/types/interfaces/IAddShipsData';

import CustomDB from '@src/data/CustomDB';

import { getAddShipsData } from '@src/utils/data_parser';

const addShips = (data: IData): void => {
  const info: IAddShipsData = getAddShipsData(data);
  const game: IGame | null = CustomDB.getInstance().gamesStorage.getGame(
    info.gameId
  );

  if (!game) throw new Error(`There is no game with ${info.gameId} in db`);

  game.setPlayerLayout(info);
};

export { addShips };
