import IGame from '@src/types/interfaces/IGame';
import IGamesStorage from '@src/types/interfaces/IGamesStorage';
import EGameRoomRespTypes from '@src/types/enums/EGameRoomRespTypes';

import CustomDB from '@src/data/CustomDB';

import {
  getCreateGameResp,
  getCreateGameRespData,
} from '@src/utils/response_builder';
import { reportOperationRes } from '@src/utils/console_printer';

const createGame = (game: IGame): void => {
  const storage: IGamesStorage = CustomDB.getInstance().gamesStorage;
  const firstPlayerData: unknown = getCreateGameRespData(game, true);
  const secondPlayerData: unknown = getCreateGameRespData(game, false);

  storage.addGame(game);
  reportOperationRes(EGameRoomRespTypes.CREATE_GAME, firstPlayerData);
  reportOperationRes(EGameRoomRespTypes.CREATE_GAME, secondPlayerData);

  game.firstPlayer.getSocket().send(getCreateGameResp(firstPlayerData));
  game.secondPlayer.getSocket().send(getCreateGameResp(secondPlayerData));
};

export { createGame };
