import WebSocket from 'ws';
import EventEmitter from 'events';

import { IRegData } from '@src/types/interfaces/IRegData';
import IRoom from '@src/types/interfaces/IRoom';

export default interface IPlayer extends IRegData, EventEmitter {
  readonly index: string;

  getSocketId: () => string;
  getRoom: () => IRoom | null;
  getSocket: () => WebSocket;

  changeSocketId: (id: string) => string;
  changeSocket: (socket: WebSocket) => WebSocket;

  enterRoom: (room: IRoom) => IRoom;
}
