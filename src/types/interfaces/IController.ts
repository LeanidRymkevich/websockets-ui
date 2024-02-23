import WebSocket, { RawData } from 'ws';

export default interface IController {
  execute: (data: RawData, socket: WebSocket) => void;
}
