import IAddShipsData from '@src/types/interfaces/IAddShipsData';
import IGame from '@src/types/interfaces/IGame';
import IPlayer from '@src/types/interfaces/IPlayer';
import { IRegData } from '@src/types/interfaces/IRegData';

const getRegisterPlayerData = (player: IPlayer): unknown => {
  return {
    name: player.name,
    index: player.index,
    error: false,
    errorText: '',
  };
};

const getRegisterPlayerErrData = (
  player: IPlayer | null,
  regData: IRegData | null,
  err: Error
): unknown => {
  return {
    name: regData ? regData.name : '',
    index: player ? player.index : '',
    error: true,
    errorText: err.message,
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

const getFinishGameData = (winner: IPlayer): unknown => {
  return {
    winPlayer: winner.index,
  };
};

const getStartGameRespData = (data: IAddShipsData): unknown => {
  return {
    ships: data.ships,
    currentPlayerIndex: data.indexPlayer,
  };
};

const getResp = (command: string, data: unknown): string => {
  return JSON.stringify({
    type: command,
    data: JSON.stringify(data),
    id: 0,
  });
};

export {
  getRegisterPlayerData,
  getRegisterPlayerErrData,
  getCreateGameRespData,
  getFinishGameData,
  getStartGameRespData,
  getResp,
};
