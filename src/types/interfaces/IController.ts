import WebSocket, { RawData } from 'ws';

export default interface IController {
  execute: (
    data: RawData,
    socketMap: Record<string, WebSocket>,
    socketId: string
  ) => void;
}
