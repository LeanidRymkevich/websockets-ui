import IPlayersStorage from '@src/types/interfaces/IPlayersStorage';
import ICustomDB from '@src/types/interfaces/ICustomDB';

import PlayersStorage from '@src/data/PlayersStorage';

export default class CustomDB implements ICustomDB {
  private static readonly instance = new CustomDB();

  public readonly playersStorage: IPlayersStorage = new PlayersStorage();

  private constructor() {}

  public static getInstance = () => this.instance;
}
