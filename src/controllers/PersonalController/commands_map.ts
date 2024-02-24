import EPersonalRespTypes from '@src/types/enums/EPersonalRespTypes';
import { TypedCommand } from '@src/types/types';

import { registerPlayer } from '@src/controllers/PersonalController/commands';

const commands: Record<EPersonalRespTypes, TypedCommand> = {
  [EPersonalRespTypes.ADD_USER_TO_ROOM]: () =>
    console.log(EPersonalRespTypes.ADD_USER_TO_ROOM),
  [EPersonalRespTypes.CREATE_ROOM]: () =>
    console.log(EPersonalRespTypes.CREATE_ROOM),
  [EPersonalRespTypes.REGISTRATION]: registerPlayer,
};

export { commands };
