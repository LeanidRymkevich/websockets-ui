import EGameRoomRespTypes from '@src/types/enums/EGameRoomRespTypes';
import { GameInnerCommand } from '@src/types/types';

import {
  attack,
  createGame,
  finishGame,
  startGame,
  turn,
} from '@src/controllers/GameInnerController/commands';

const commands: Record<EGameRoomRespTypes, GameInnerCommand> = {
  [EGameRoomRespTypes.CREATE_GAME]: createGame,
  [EGameRoomRespTypes.START_GAME]: startGame,
  [EGameRoomRespTypes.ATTACK]: attack,
  [EGameRoomRespTypes.TURN]: turn,
  [EGameRoomRespTypes.FINISH]: finishGame,
};

export { commands };
