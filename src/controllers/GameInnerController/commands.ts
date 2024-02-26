import IGame from '@src/types/interfaces/IGame';
import IGamesStorage from '@src/types/interfaces/IGamesStorage';
import EGameRoomRespTypes from '@src/types/enums/EGameRoomRespTypes';
import IPlayer from '@src/types/interfaces/IPlayer';
import IWinnersStorage from '@src/types/interfaces/IWinnersStorage';

import CustomDB from '@src/data/CustomDB';

import {
  getCreateGameResp,
  getCreateGameRespData,
  getFinishGameData,
  getFinishGameResp,
  getStartGameResp,
  getStartGameRespData,
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

const finishGame = (game: IGame): void => {
  const winner: IPlayer | null = game.getWinner();
  const storage: IWinnersStorage = CustomDB.getInstance().winnersStorage;

  if (!winner)
    throw new Error(`Failed to resolve game with id ${game.gameId} winner!`);

  storage.addWinner(winner);

  const data: unknown = getFinishGameData(winner);
  const response: string = getFinishGameResp(data);

  reportOperationRes(EGameRoomRespTypes.FINISH, data);
  game.firstPlayer.getSocket().send(response);
  game.secondPlayer.getSocket().send(response);
};

const startGame = (game: IGame): void => {
  const firstPlayerData = getStartGameRespData(game.getFirstPlayerShipsInfo()!);
  const secondPlayerData = getStartGameRespData(
    game.getSecondPlayerShipsInfo()!
  );

  reportOperationRes(EGameRoomRespTypes.START_GAME, firstPlayerData);
  reportOperationRes(EGameRoomRespTypes.START_GAME, secondPlayerData);

  game.firstPlayer.getSocket().send(getStartGameResp(firstPlayerData));
  game.secondPlayer.getSocket().send(getStartGameResp(secondPlayerData));
};

export { createGame, finishGame, startGame };
