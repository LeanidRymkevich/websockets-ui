import EGameRoomRespTypes from '@src/types/enums/EGameRoomRespTypes';
import IGame from '@src/types/interfaces/IGame';

export default interface IGameInnerController {
  execute: (command: EGameRoomRespTypes, game: IGame) => void;
}
