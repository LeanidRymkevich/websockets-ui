import ECommonRespTypes from '@src/types/enums/ECommonRespTypes';
import EGameRoomRespTypes from '@src/types/enums/EGameRoomRespTypes';
import EPersonalRespTypes from '@src/types/enums/EPersonalRespTypes';

export default interface IData {
  type: ECommonRespTypes | EGameRoomRespTypes | EPersonalRespTypes;
  data: unknown;
  id: number;
}
