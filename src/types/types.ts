import WebSocket from 'ws';

import IData from '@src/types/interfaces/IData';
import IPlayer from '@src/types/interfaces/IPlayer';

type IPlayerParams = Pick<IPlayer, 'name' | 'password'> & { socketId: string };

type TypedCommand = (
  data: IData,
  socketMap: Record<string, WebSocket>,
  socketId: string
) => void;

type CommonCommand = (socket: WebSocket) => void;

export { IPlayerParams, TypedCommand, CommonCommand };
