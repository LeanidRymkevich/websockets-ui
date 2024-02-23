import WebSocket from 'ws';

import IData from '@src/types/interfaces/IData';

export default interface ITypedController {
  execute: (data: IData, socket: WebSocket) => void;
  haveCommand(commandName: string): boolean;
}
