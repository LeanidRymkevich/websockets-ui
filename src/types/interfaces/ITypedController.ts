import WebSocket from 'ws';

import IData from '@src/types/interfaces/IData';

export default interface ITypedController {
  execute(
    data: IData,
    socketMap: Record<string, WebSocket>,
    socketId: string
  ): void;
}
