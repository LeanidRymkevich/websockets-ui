import IPlayersStorage from '@src/types/interfaces/IPlayersStorage';
import PlayersStorage from './PlayersStorage';
import ICustomDB from '@src/types/interfaces/ICustomDB';

export default class CustomDB implements ICustomDB {
  private static readonly instance = new CustomDB();

  public readonly playersStorage: IPlayersStorage = new PlayersStorage();

  private constructor() {}

  public static getInstance = () => this.instance;
}
