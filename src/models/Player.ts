import { IPlayerParams } from '@src/types/types';
import IPlayer from '@src/types/interfaces/IPlayer';

export default class Player implements IPlayer {
  public readonly name: string;
  public readonly password: string;
  public readonly index: string;

  private socketId: string;

  public constructor(params: IPlayerParams, index: string) {
    this.index = index;
    this.name = params.name;
    this.password = params.password;
    this.socketId = params.socketId;
  }

  public getSocketId = (): string => this.socketId;
  public changeSocketId = (id: string): string => (this.socketId = id);
}
