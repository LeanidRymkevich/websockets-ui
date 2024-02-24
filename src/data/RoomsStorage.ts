import { randomUUID } from 'crypto';

import IRoom from '@src/types/interfaces/IRoom';
import Room from '@src/models/Room';

export default class RoomsStorage implements IRoomsStorage {
  private readonly storage: Record<string, IRoom> = {};

  public addRoom = (room: IRoom): IRoom => {
    const id: string = randomUUID();
    const room: IRoom = new Room()
  };
}
