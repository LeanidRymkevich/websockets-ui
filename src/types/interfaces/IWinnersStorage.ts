import IPlayer from '@src/types/interfaces/IPlayer';
import IWinnerInfo from '@src/types/interfaces/IWinnerInfo';

export default interface IWinnersStorage {
  addWinner: (player: IPlayer) => Record<string, number>;
  getWinners: () => IWinnerInfo[];
}
