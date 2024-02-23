import WebSocket from 'ws';
import { IRegData } from './IRegData';

export interface IPlayer extends IRegData {
  readonly index: string;
  readonly socket: WebSocket;
}
