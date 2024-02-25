import { randomUUID } from 'crypto';

import IRoom from '@src/types/interfaces/IRoom';
import IPlayer from '@src/types/interfaces/IPlayer';
import ERoomEvent from '@src/types/enums/ERoomEvent';
import IRoomsStorage from '@src/types/interfaces/IRoomsStorage';

import Room from '@src/models/Room';

export default class RoomsStorage implements IRoomsStorage {
  private storage: IRoom[] = [];

  public addRoom = (): IRoom => {
    const id: string = randomUUID();
    const room: IRoom = new Room(id);

    this.storage.push(room);
    room.on(ERoomEvent.CLOSE, (): void => {
      this.storage = this.storage.filter(
        (room: IRoom): boolean => room.roomId !== id
      );
    });

    return room;
  };

  public getRoomByPlayerId = (playerId: string): IRoom | null => {
    const result: IRoom | undefined = this.storage.find(
      (room: IRoom): boolean => {
        const firstPlayer: IPlayer | null = room.getFirstPlayer();
        const secondPlayer: IPlayer | null = room.getSecondPlayer();
        return (
          (!!firstPlayer && firstPlayer.index === playerId) ||
          (!!secondPlayer && secondPlayer.index === playerId)
        );
      }
    );

    return result || null;
  };

  public getUnfilledRooms = (): IRoom[] =>
    this.storage.filter((room: IRoom): boolean => !room.getSecondPlayer());
}
