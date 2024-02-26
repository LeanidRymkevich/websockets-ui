import IGame from '@src/types/interfaces/IGame';
import IGamesStorage from '@src/types/interfaces/IGamesStorage';
import EGameRoomRespTypes from '@src/types/enums/EGameRoomRespTypes';
import IPlayer from '@src/types/interfaces/IPlayer';
import IWinnersStorage from '@src/types/interfaces/IWinnersStorage';

import CustomDB from '@src/data/CustomDB';

import {
  getAttackRespData,
  getCreateGameRespData,
  getFinishGameData,
  getResp,
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

  game.firstPlayer
    .getSocket()
    .send(getResp(EGameRoomRespTypes.CREATE_GAME, firstPlayerData));
  game.secondPlayer
    .getSocket()
    .send(getResp(EGameRoomRespTypes.CREATE_GAME, secondPlayerData));
};

const finishGame = (game: IGame): void => {
  const winner: IPlayer | null = game.getWinner();
  const storage: IWinnersStorage = CustomDB.getInstance().winnersStorage;

  if (!winner)
    throw new Error(`Failed to resolve game with id ${game.gameId} winner!`);

  storage.addWinner(winner);

  const data: unknown = getFinishGameData(winner);
  const response: string = getResp(EGameRoomRespTypes.FINISH, data);

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

  game.firstPlayer
    .getSocket()
    .send(getResp(EGameRoomRespTypes.START_GAME, firstPlayerData));
  game.secondPlayer
    .getSocket()
    .send(getResp(EGameRoomRespTypes.START_GAME, secondPlayerData));
};

const turn = (game: IGame): void => {
  let currentPlayerId: string;

  if (game.getIsFirstPlayerTurn()) {
    currentPlayerId = game.firstPlayer.index;
  } else {
    currentPlayerId = game.secondPlayer.index;
  }

  const data = { currentPlayerId };

  reportOperationRes(EGameRoomRespTypes.TURN, data);

  game.firstPlayer.getSocket().send(getResp(EGameRoomRespTypes.TURN, data));
  game.secondPlayer.getSocket().send(getResp(EGameRoomRespTypes.TURN, data));
};

const attack = (game: IGame): void => {
  let currentPlayerId: string;

  if (game.getIsFirstPlayerTurn()) {
    currentPlayerId = game.firstPlayer.index;
  } else {
    currentPlayerId = game.secondPlayer.index;
  }

  const data = getAttackRespData(game.getLastAttackRes()!, currentPlayerId);
  reportOperationRes(EGameRoomRespTypes.ATTACK, data);

  game.firstPlayer.getSocket().send(getResp(EGameRoomRespTypes.ATTACK, data));
  game.secondPlayer.getSocket().send(getResp(EGameRoomRespTypes.ATTACK, data));

  turn(game);
};

export { createGame, finishGame, startGame, turn, attack };
