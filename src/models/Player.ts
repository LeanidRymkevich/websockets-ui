import { IPlayerParams } from '@src/types/types';
import IPlayer from '@src/types/interfaces/IPlayer';
import IRoom from '@src/types/interfaces/IRoom';
import ERoomEvent from '@src/types/enums/ERoomEvent';
import EventEmitter from 'events';
import EPlayerEvents from '@src/types/enums/EPlayerEvents';

export default class Player extends EventEmitter implements IPlayer {
  public readonly name: string;
  public readonly password: string;
  public readonly index: string;

  private socketId: string;
  private room: IRoom | null = null;

  public constructor(params: IPlayerParams, index: string) {
    super();
    this.index = index;
    this.name = params.name;
    this.password = params.password;
    this.socketId = params.socketId;
  }

  public getSocketId = (): string => this.socketId;
  public getRoom = (): IRoom | null => this.room;

  public changeSocketId = (id: string): string => (this.socketId = id);

  public enterRoom = (room: IRoom): IRoom => {
    this.room = room;
    room.on(ERoomEvent.CLOSE, (): void => {
      this.room = null;
    });

    return room;
  };

  public leave = (): boolean => this.emit(EPlayerEvents.LEAVE, this);
}
