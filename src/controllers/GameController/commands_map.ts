import EGameRoomReqTypes from '@src/types/enums/EGameRoomReqTypes';
import { TypedCommand } from '@src/types/types';

import { addShips } from '@src/controllers/GameController/commands';

const commands: Record<EGameRoomReqTypes, TypedCommand> = {
  [EGameRoomReqTypes.ADD_SHIPS]: addShips,
  [EGameRoomReqTypes.ATTACK]: () => console.log(EGameRoomReqTypes.ATTACK),
  [EGameRoomReqTypes.RANDOM_ATTACK]: () =>
    console.log(EGameRoomReqTypes.RANDOM_ATTACK),
};

export { commands };
