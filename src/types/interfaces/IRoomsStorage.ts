import IPlayer from '@src/types/interfaces/IPlayer';
import IRoom from '@src/types/interfaces/IRoom';

export default interface IRoomsStorage {
  addRoom: (player: IPlayer) => IRoom;
  getRoomByPlayerId: (playerId: string) => IRoom | null;
  getUnfilledRooms: () => IRoom[];
}
