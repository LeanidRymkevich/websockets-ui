import { WebSocket } from 'ws';

import { IPlayerParams } from '@src/types/types';
import { IPlayer } from '@src/types/interfaces/IPlayer';

export default class Player implements IPlayer {
  public readonly login: string;
  public readonly password: string;
  public readonly index: string;
  public readonly socket: WebSocket;

  public constructor(params: IPlayerParams, index: string) {
    this.index = index;
    this.login = params.login;
    this.password = params.password;
    this.socket = params.socket;
  }
}
