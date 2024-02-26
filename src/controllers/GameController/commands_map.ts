import EGameRoomReqTypes from '@src/types/enums/EGameRoomReqTypes';
import { TypedCommand } from '@src/types/types';

import {
  addShips,
  attack,
  randomAttack,
} from '@src/controllers/GameController/commands';

const commands: Record<EGameRoomReqTypes, TypedCommand> = {
  [EGameRoomReqTypes.ADD_SHIPS]: addShips,
  [EGameRoomReqTypes.ATTACK]: attack,
  [EGameRoomReqTypes.RANDOM_ATTACK]: randomAttack,
};

export { commands };
