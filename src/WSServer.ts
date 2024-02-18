import { IncomingMessage } from 'http';
import WebSocket, { Server } from 'ws';

export default class WSServer {
  private readonly port: number;
  private readonly server: Server;

  constructor(port: number) {
    this.port = port;
    this.server = this.initialize();
    this.server.on('connection', this.onConnection);
  }

  private initialize = (): Server => {
    console.log(`Start web socket server on on the ${this.port} port!`);
    return new Server({ port: this.port });
  };

  private onConnection = (
    socket: WebSocket,
    request: IncomingMessage
  ): void => {
    console.log(socket, request);
  };
}
