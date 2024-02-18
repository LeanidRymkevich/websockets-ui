import WebSocket, { Server, RawData } from 'ws';

import {
  printWssStartMsg,
  printWssErrorMsg,
  printNewSocketMsg,
  printCloseSocketMsg,
  printErrorSocketMsg,
} from '@src/utils/console_printer';
import Controller from '@src/Controller';

export default class WSServer {
  private readonly port: number;
  private readonly server: Server;
  private socketsNum: number = 0;

  constructor(port: number) {
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
    printNewSocketMsg(++this.socketsNum);

    socket.on('message', (data: RawData): void => {
      Controller.getInstance().execute(data);
    });

    socket.on('close', (): void => {
      printCloseSocketMsg(--this.socketsNum);
      socket.close();
    });
    socket.on('error', (error: Error): void => {
      printErrorSocketMsg(--this.socketsNum, error);
      socket.close();
    });
  };

  private onError = (error: Error): void => {
    printWssErrorMsg(this.port, error);
    this.server.close();
  };
}
