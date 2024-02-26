import EGameRoomRespTypes from '@src/types/enums/EGameRoomRespTypes';
import IGame from '@src/types/interfaces/IGame';
import IPlayer from '@src/types/interfaces/IPlayer';

const getCreateGameRespData = (
  game: IGame,
  forFirstPlayer: boolean
): unknown => {
  return {
    idGame: game.gameId,
    idPlayer: forFirstPlayer ? game.firstPlayer.index : game.secondPlayer.index,
  };
};

const getCreateGameResp = (data: unknown): string => {
  return JSON.stringify({
    type: EGameRoomRespTypes.CREATE_GAME,
    data: JSON.stringify(data),
    id: 0,
  });
};

const getFinishGameData = (winner: IPlayer): unknown => {
  return {
    winPlayer: winner.index,
  };
};

const getFinishGameResp = (data: unknown): string => {
  return JSON.stringify({
    type: EGameRoomRespTypes.FINISH,
    data: JSON.stringify(data),
    id: 0,
  });
};

export {
  getCreateGameRespData,
  getCreateGameResp,
  getFinishGameData,
  getFinishGameResp,
};
