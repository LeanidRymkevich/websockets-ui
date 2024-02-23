import { IPlayer } from './interfaces/IPlayer';

type IPlayerParams = Pick<IPlayer, 'login' | 'password' | 'socket'>;

export { IPlayerParams };
