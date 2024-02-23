import WebSocket, { Server, RawData } from 'ws';

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
  private socketCounter: number = 0;

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
    printNewSocketMsg(++this.socketCounter);

    socket.on('message', (data: RawData): void => {
      Controller.getInstance().execute(data, socket);
    });

    socket.on('close', (): void => {
      printCloseSocketMsg(--this.socketCounter);
      socket.close();
    });
    socket.on('error', (error: Error): void => {
      printErrorSocketMsg(--this.socketCounter, error);
      socket.close();
    });
  };

  private onError = (error: Error): void => {
    printWssErrorMsg(this.port, error);
    this.server.close();
  };
}
