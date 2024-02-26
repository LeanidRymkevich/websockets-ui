import IShipPosition from '@src/types/interfaces/IShipPosition';

export default interface IAddShipsData {
  gameId: string;
  ships: IShipPosition[];
  indexPlayer: string;
}
