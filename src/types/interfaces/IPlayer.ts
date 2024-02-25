import { IRegData } from '@src/types/interfaces/IRegData';
import IRoom from '@src/types/interfaces/IRoom';
import EventEmitter from 'events';

export default interface IPlayer extends IRegData, EventEmitter {
  readonly index: string;

  getSocketId: () => string;
  getRoom: () => IRoom | null;

  changeSocketId: (id: string) => string;
  leave: () => boolean;
}
