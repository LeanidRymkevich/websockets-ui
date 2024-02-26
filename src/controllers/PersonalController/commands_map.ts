import EPersonalRespTypes from '@src/types/enums/EPersonalRespTypes';
import { TypedCommand } from '@src/types/types';

import {
  addUserToRoom,
  createRoom,
  registerPlayer,
} from '@src/controllers/PersonalController/commands';

const commands: Record<EPersonalRespTypes, TypedCommand> = {
  [EPersonalRespTypes.ADD_USER_TO_ROOM]: addUserToRoom,
  [EPersonalRespTypes.CREATE_ROOM]: createRoom,
  [EPersonalRespTypes.REGISTRATION]: registerPlayer,
  [EPersonalRespTypes.SINGLE_PLAY]: () =>
    console.log(EPersonalRespTypes.SINGLE_PLAY),
};

export { commands };
