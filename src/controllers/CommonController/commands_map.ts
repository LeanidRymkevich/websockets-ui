import ECommonRespTypes from '@src/types/enums/ECommonRespTypes';
import { CommonCommand } from '@src/types/types';

import { updateRoom } from '@src/controllers/CommonController/commands';

const commands: Record<ECommonRespTypes, CommonCommand> = {
  [ECommonRespTypes.UPDATE_ROOM]: updateRoom,
  [ECommonRespTypes.UPDATE_WINNERS]: () =>
    console.log(ECommonRespTypes.UPDATE_WINNERS),
};

export { commands };
