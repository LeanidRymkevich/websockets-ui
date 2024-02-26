import EGameRoomReqTypes from '@src/types/enums/EGameRoomReqTypes';
import EGameRoomRespTypes from '@src/types/enums/EGameRoomRespTypes';

// TODO: add appropriate type
// eslint-disable-next-line @typescript-eslint/ban-types
const commands: Record<EGameRoomReqTypes, Function> = {
  [EGameRoomReqTypes.ADD_SHIPS]: () => console.log(EGameRoomReqTypes.ADD_SHIPS),
  [EGameRoomReqTypes.ATTACK]: () => console.log(EGameRoomReqTypes.ATTACK),
  [EGameRoomReqTypes.RANDOM_ATTACK]: () =>
    console.log(EGameRoomReqTypes.RANDOM_ATTACK),
};

// TODO: add appropriate type
// eslint-disable-next-line @typescript-eslint/ban-types
const gameCommands: Record<EGameRoomRespTypes, Function> = {
  [EGameRoomRespTypes.CREATE_GAME]: () =>
    console.log(EGameRoomRespTypes.CREATE_GAME),
  [EGameRoomRespTypes.START_GAME]: () =>
    console.log(EGameRoomRespTypes.START_GAME),
  [EGameRoomRespTypes.ATTACK]: () => console.log(EGameRoomRespTypes.ATTACK),
  [EGameRoomRespTypes.TURN]: () => console.log(EGameRoomRespTypes.TURN),
  [EGameRoomRespTypes.FINISH]: () => console.log(EGameRoomRespTypes.FINISH),
};

export { commands, gameCommands };
