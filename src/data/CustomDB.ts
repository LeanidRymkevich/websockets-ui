import IPlayersStorage from '@src/types/interfaces/IPlayersStorage';
import ICustomDB from '@src/types/interfaces/ICustomDB';
import IRoomsStorage from '@src/types/interfaces/IRoomsStorage';

import PlayersStorage from '@src/data/PlayersStorage';
import RoomsStorage from '@src/data/RoomsStorage';

export default class CustomDB implements ICustomDB {
  private static readonly instance = new CustomDB();

  public readonly playersStorage: IPlayersStorage = new PlayersStorage();
  public readonly roomsStorage: IRoomsStorage = new RoomsStorage();

  private constructor() {}

  public static getInstance = () => this.instance;
}
