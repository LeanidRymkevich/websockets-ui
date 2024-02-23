import WebSocket from 'ws';

export interface IPlayer {
  readonly login: string;
  readonly password: string;
  readonly index: string;
  readonly socket: WebSocket;
}
