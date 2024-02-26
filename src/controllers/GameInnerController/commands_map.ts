import EGameRoomRespTypes from '@src/types/enums/EGameRoomRespTypes';
import { GameInnerCommand } from '@src/types/types';

const commands: Record<EGameRoomRespTypes, GameInnerCommand> = {
  [EGameRoomRespTypes.CREATE_GAME]: () =>
    console.log(EGameRoomRespTypes.CREATE_GAME),
  [EGameRoomRespTypes.START_GAME]: () =>
    console.log(EGameRoomRespTypes.START_GAME),
  [EGameRoomRespTypes.ATTACK]: () => console.log(EGameRoomRespTypes.ATTACK),
  [EGameRoomRespTypes.TURN]: () => console.log(EGameRoomRespTypes.TURN),
  [EGameRoomRespTypes.FINISH]: () => console.log(EGameRoomRespTypes.FINISH),
};

export { commands };
