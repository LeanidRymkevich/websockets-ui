import { randomUUID } from 'crypto';

import IRoom from '@src/types/interfaces/IRoom';
import IPlayer from '@src/types/interfaces/IPlayer';
import ERoomEvent from '@src/types/enums/ERoomEvent';
import IRoomsStorage from '@src/types/interfaces/IRoomsStorage';

import Room from '@src/models/Room';

export default class RoomsStorage implements IRoomsStorage {
  private readonly storage: Record<string, IRoom> = {};

  public addRoom = (): IRoom => {
    const id: string = randomUUID();
    const room: IRoom = new Room(id);

    this.storage[id] = room;
    room.on(ERoomEvent.CLOSE, (): void => {
      delete this.storage[id];
    });

    return room;
  };

  public getRoomById = (id: string): IRoom | null => {
    return this.storage[id] || null;
  };

  public getRoomByPlayerId = (playerId: string): IRoom | null => {
    const result: IRoom | undefined = Object.values(this.storage).find(
      (room: IRoom): boolean => {
        const firstPlayer: IPlayer | null = room.getFirstPlayer();
        const secondPlayer: IPlayer | null = room.getSecondPlayer();
        return (
          (!!firstPlayer && firstPlayer.getSocketId() === playerId) ||
          (!!secondPlayer && secondPlayer.getSocketId() === playerId)
        );
      }
    );

    return result || null;
  };

  public getUnfilledRooms = (): IRoom[] =>
    Object.values(this.storage).filter(
      (room: IRoom): boolean =>
        !room.getSecondPlayer() || !room.getFirstPlayer()
    );
}
