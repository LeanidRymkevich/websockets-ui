import { randomUUID } from 'crypto';

import IPlayer from '@src/types/interfaces/IPlayer';
import { IPlayerParams } from '@src/types/types';
import IPlayersStorage from '@src/types/interfaces/IPlayersStorage';

import RegistrationError from '@src/errors/RegistrationError';

import Player from '@src/models/Player';

export default class PlayersStorage implements IPlayersStorage {
  private readonly storage: Record<string, IPlayer> = {};

  public addPlayer = (playerParams: IPlayerParams): IPlayer => {
    const existingPlayerKey: string | null = this.getPlayerKeyByLogin(
      playerParams.name
    );

    if (!existingPlayerKey) {
      const index: string = randomUUID();
      const player: IPlayer = new Player(playerParams, index);
      this.storage[playerParams.socketId] = player;
      return player;
    }

    const existingPlayer = this.storage[existingPlayerKey]!;
    existingPlayer.changeSocketId(playerParams.socketId);

    delete this.storage[existingPlayerKey];
    this.storage[playerParams.socketId] = existingPlayer;

    if (existingPlayer.password !== playerParams.password) {
      throw new RegistrationError(playerParams);
    }

    return existingPlayer;
  };

  public getPlayerBySocketId = (id: string): IPlayer | null => {
    return this.storage[id] || null;
  };

  private getPlayerKeyByLogin = (name: string): string | null => {
    const result: string | undefined = Object.keys(this.storage).find(
      (key: string): boolean => this.storage[key]!.name === name
    );

    return result || null;
  };
}
