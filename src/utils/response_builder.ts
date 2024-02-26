import EGameRoomRespTypes from '@src/types/enums/EGameRoomRespTypes';
import EPersonalRespTypes from '@src/types/enums/EPersonalRespTypes';
import IAddShipsData from '@src/types/interfaces/IAddShipsData';
import IGame from '@src/types/interfaces/IGame';
import IPlayer from '@src/types/interfaces/IPlayer';
import { IRegData } from '@src/types/interfaces/IRegData';

const getRegisterPlayerResp = (player: IPlayer): unknown => {
  return {
    type: EPersonalRespTypes.REGISTRATION,
    data: JSON.stringify({
      name: player.name,
      index: player.index,
      error: false,
      errorText: '',
    }),
    id: 0,
  };
};

const getRegisterPlayerErrResp = (
  player: IPlayer | null,
  regData: IRegData | null,
  err: Error
): unknown => {
  return {
    type: EPersonalRespTypes.REGISTRATION,
    data: JSON.stringify({
      name: regData ? regData.name : '',
      index: player ? player.index : '',
      error: true,
      errorText: err.message,
    }),
    id: 0,
  };
};

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

const getStartGameRespData = (data: IAddShipsData): unknown => {
  return {
    ships: data.ships,
    currentPlayerIndex: data.indexPlayer,
  };
};

const getStartGameResp = (data: unknown): string => {
  return JSON.stringify({
    type: EGameRoomRespTypes.START_GAME,
    data: JSON.stringify(data),
    id: 0,
  });
};

export {
  getRegisterPlayerResp,
  getRegisterPlayerErrResp,
  getCreateGameRespData,
  getCreateGameResp,
  getFinishGameData,
  getFinishGameResp,
  getStartGameRespData,
  getStartGameResp,
};
