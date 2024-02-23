import IPlayersStorage from './IPlayersStorage';

export default interface ICustomDB {
  readonly playersStorage: IPlayersStorage;
}
