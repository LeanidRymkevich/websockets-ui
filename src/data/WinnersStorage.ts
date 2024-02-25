import IPlayer from '@src/types/interfaces/IPlayer';
import IWinnerInfo from '@src/types/interfaces/IWinnerInfo';
import IWinnersStorage from '@src/types/interfaces/IWinnersStorage';

export default class WinnersStorage implements IWinnersStorage {
  private readonly storage: Record<string, number> = {};

  public addWinner = (player: IPlayer): Record<string, number> => {
    const { name } = player;
    const wins: number | undefined = this.storage[name];

    if (wins === undefined) {
      this.storage[name] = 1;
    } else {
      this.storage[name] = wins + 1;
    }

    return this.storage;
  };

  public getWinners = (): IWinnerInfo[] =>
    Object.entries(this.storage).map(
      ([name, wins]: [string, number]): IWinnerInfo => {
        return {
          name,
          wins,
        };
      }
    );
}
