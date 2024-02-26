import WebSocket from 'ws';

import IData from '@src/types/interfaces/IData';
import IPlayer from '@src/types/interfaces/IPlayer';
import IGame from './interfaces/IGame';

type IPlayerParams = Pick<IPlayer, 'name' | 'password'> & {
  socket: WebSocket;
  socketId: string;
};

type TypedCommand = (
  data: IData,
  socketMap: Record<string, WebSocket>,
  socketId: string
) => void;

type CommonCommand = (socketMap: Record<string, WebSocket>) => void;

type GameInnerCommand = (game: IGame) => void;

export { IPlayerParams, TypedCommand, CommonCommand, GameInnerCommand };
