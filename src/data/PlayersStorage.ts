import { randomUUID } from 'crypto';

import IPlayer from '@src/types/interfaces/IPlayer';
import { IPlayerParams } from '@src/types/types';
import IPlayersStorage from '@src/types/interfaces/IPlayersStorage';

import RegistrationError from '@src/errors/RegistrationError';

import Player from '@src/models/Player';

export default class PlayersStorage implements IPlayersStorage {
  private readonly storage: Record<string, IPlayer> = {};

  public addPlayer = (playerParams: IPlayerParams): IPlayer => {
    const existingPlayer: IPlayer | null = this.getPlayerByLogin(
      playerParams.name
    );

    if (!existingPlayer) {
      const index: string = randomUUID();
      const player: IPlayer = new Player(playerParams, index);
      this.storage[index] = player;
      return player;
    } else {
      existingPlayer.changeSocketId(playerParams.socketId);
    }

    if (existingPlayer.password !== playerParams.password) {
      throw new RegistrationError(playerParams);
    }

    return existingPlayer;
  };

  private getPlayerByLogin = (name: string): IPlayer | null => {
    const result: IPlayer | undefined = Object.values(this.storage).find(
      (player: IPlayer): boolean => player.name === name
    );

    return result || null;
  };
}
