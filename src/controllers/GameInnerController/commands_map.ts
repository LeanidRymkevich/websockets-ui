import EGameRoomRespTypes from '@src/types/enums/EGameRoomRespTypes';
import { GameInnerCommand } from '@src/types/types';

import {
  createGame,
  finishGame,
  startGame,
} from '@src/controllers/GameInnerController/commands';

const commands: Record<EGameRoomRespTypes, GameInnerCommand> = {
  [EGameRoomRespTypes.CREATE_GAME]: createGame,
  [EGameRoomRespTypes.START_GAME]: startGame,
  [EGameRoomRespTypes.ATTACK]: () => console.log(EGameRoomRespTypes.ATTACK),
  [EGameRoomRespTypes.TURN]: () => console.log(EGameRoomRespTypes.TURN),
  [EGameRoomRespTypes.FINISH]: finishGame,
};

export { commands };
