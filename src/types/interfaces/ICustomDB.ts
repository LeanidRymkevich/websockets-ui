import IPlayersStorage from '@src/types/interfaces/IPlayersStorage';
import IRoomsStorage from '@src/types/interfaces/IRoomsStorage';

export default interface ICustomDB {
  readonly playersStorage: IPlayersStorage;
  readonly roomsStorage: IRoomsStorage;
}
