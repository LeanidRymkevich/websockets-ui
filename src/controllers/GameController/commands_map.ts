import EGameRoomReqTypes from '@src/types/enums/EGameRoomReqTypes';
import { TypedCommand } from '@src/types/types';

const commands: Record<EGameRoomReqTypes, TypedCommand> = {
  [EGameRoomReqTypes.ADD_SHIPS]: () => console.log(EGameRoomReqTypes.ADD_SHIPS),
  [EGameRoomReqTypes.ATTACK]: () => console.log(EGameRoomReqTypes.ATTACK),
  [EGameRoomReqTypes.RANDOM_ATTACK]: () =>
    console.log(EGameRoomReqTypes.RANDOM_ATTACK),
};

export { commands };
