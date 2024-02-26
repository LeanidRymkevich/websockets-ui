import WebSocket, { Server, RawData } from 'ws';
import { randomUUID } from 'crypto';

import {
  printWssStartMsg,
  printWssErrorMsg,
  printNewSocketMsg,
  printCloseSocketMsg,
  printErrorSocketMsg,
} from '@src/utils/console_printer';
import Controller from '@src/controllers/Controller';

export default class WSServer {
  private readonly port: number;
  private readonly server: Server;
  private socketsMap: Record<string, WebSocket> = {};

  public constructor(port: number) {
    this.port = port;
    this.server = this.initialize();
    this.server.on('connection', this.onConnection);
    this.server.on('error', this.onError);
  }

  private initialize = (): Server => {
    printWssStartMsg(this.port);
    return new Server({ port: this.port });
  };

  private onConnection = (socket: WebSocket): void => {
    const id: string = randomUUID();
    this.socketsMap[id] = socket;
    printNewSocketMsg(id);

    socket.on('message', (data: RawData): void => {
      Controller.getInstance().execute(data, this.socketsMap, id);
    });

    socket.on('close', (): void => {
      printCloseSocketMsg(id);
      socket.close();
      delete this.socketsMap[id];
    });

    socket.on('error', (error: Error): void => {
      printErrorSocketMsg(id, error);
      socket.close();
      delete this.socketsMap[id];
    });
  };

  private onError = (error: Error): void => {
    printWssErrorMsg(this.port, error);
    this.server.close();
  };
}
