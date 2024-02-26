import ECommonRespTypes from '@src/types/enums/ECommonRespTypes';
import EPersonalRespTypes from '@src/types/enums/EPersonalRespTypes';
import EGameRoomReqTypes from '@src/types/enums/EGameRoomReqTypes';

export default interface IData {
  type: ECommonRespTypes | EGameRoomReqTypes | EPersonalRespTypes;
  data: unknown;
  id: number;
}
