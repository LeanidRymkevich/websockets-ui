import IPlayersStorage from '@src/types/interfaces/IPlayersStorage';
import ICustomDB from '@src/types/interfaces/ICustomDB';
import IRoomsStorage from '@src/types/interfaces/IRoomsStorage';
import IWinnersStorage from '@src/types/interfaces/IWinnersStorage';
import IGamesStorage from '@src/types/interfaces/IGamesStorage';

import PlayersStorage from '@src/data/PlayersStorage';
import RoomsStorage from '@src/data/RoomsStorage';
import WinnersStorage from '@src/data/WinnersStorage';
import GamesStorage from '@src/data/GamesStorage';

export default class CustomDB implements ICustomDB {
  private static readonly instance = new CustomDB();

  public readonly playersStorage: IPlayersStorage = new PlayersStorage();
  public readonly roomsStorage: IRoomsStorage = new RoomsStorage();
  public readonly winnersStorage: IWinnersStorage = new WinnersStorage();
  public readonly gamesStorage: IGamesStorage = new GamesStorage();

  private constructor() {}

  public static getInstance = () => this.instance;
}
