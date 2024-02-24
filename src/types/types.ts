import WebSocket from 'ws';

import IData from '@src/types/interfaces/IData';
import { IPlayer } from '@src/types/interfaces/IPlayer';

type IPlayerParams = Pick<IPlayer, 'login' | 'password' | 'socket'>;
type TypedCommand = (data: IData, socket: WebSocket) => void;

export { IPlayerParams, TypedCommand };
