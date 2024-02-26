import { randomUUID } from 'crypto';
import EventEmitter from 'events';

import IGame from '@src/types/interfaces/IGame';
import IPlayer from '@src/types/interfaces/IPlayer';
import EGameEvents from '@src/types/enums/EGameEvents';
import EPlayerEvents from '@src/types/enums/EPlayerEvents';

export default class Game extends EventEmitter implements IGame {
  public readonly firstPlayer: IPlayer;
  public readonly secondPlayer: IPlayer;
  public readonly gameId: string = randomUUID();

  public constructor(firstPlayer: IPlayer, secondPlayer: IPlayer) {
    super();
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;

    this.firstPlayer.on(EPlayerEvents.LEAVE, this.finish);
    this.secondPlayer.on(EPlayerEvents.LEAVE, this.finish);
  }

  private finish = (): void => {
    this.emit(EGameEvents.FINISH, this);
  };
}
