import WebSocket from 'ws';

import ECommonRespTypes from '@src/types/enums/ECommonRespTypes';

export default interface ICommonController {
  execute: (command: ECommonRespTypes, socket: WebSocket) => void;
}
