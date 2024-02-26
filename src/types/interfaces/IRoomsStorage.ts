import IRoom from '@src/types/interfaces/IRoom';

export default interface IRoomsStorage {
  addRoom: () => IRoom;
  getRoomByPlayerId: (playerId: string) => IRoom | null;
  getRoomById: (id: string) => IRoom | null;
  getUnfilledRooms: () => IRoom[];
}
