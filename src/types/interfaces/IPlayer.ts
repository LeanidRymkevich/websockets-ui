import { IRegData } from './IRegData';

export default interface IPlayer extends IRegData {
  readonly index: string;

  getSocketId: () => string;
  changeSocketId: (id: string) => string;
}
