import IPlayersStorage from '@src/types/interfaces/IPlayersStorage';
import IRoomsStorage from '@src/types/interfaces/IRoomsStorage';
import IWinnersStorage from '@src/types/interfaces/IWinnersStorage';
import IGamesStorage from '@src/types/interfaces/IGamesStorage';

export default interface ICustomDB {
  readonly playersStorage: IPlayersStorage;
  readonly roomsStorage: IRoomsStorage;
  readonly winnersStorage: IWinnersStorage;
  readonly gamesStorage: IGamesStorage;
}
