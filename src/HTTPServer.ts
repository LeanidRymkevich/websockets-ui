import { readFile } from 'fs';
import { resolve, dirname } from 'path';
import { Server, createServer } from 'http';

import IHTTPServer from '@src/types/interfaces/IHTTPServer';

import {
  printHttpServerStartMsg,
  printHttpServerErrorMsg,
} from '@src/utils/console_printer';

export default class HTTPServer implements IHTTPServer {
  private static readonly INDEX_HTML_PATH = '/front/index.html';

  private readonly port: number;
  private readonly server: Server;

  constructor(port: number) {
    this.port = port;
    this.server = this.initialize();
    this.server.on('error', this.onError);
  }

  public start = (): void => {
    printHttpServerStartMsg(this.port);
    this.server.listen(this.port);
  };

  private initialize = (): Server => {
    return createServer((req, res): void => {
      const __dirname: string = resolve(dirname(''));
      const filePath: string =
        __dirname +
        (req.url === '/' ? HTTPServer.INDEX_HTML_PATH : `/front${req.url}`);

      readFile(filePath, function (err, data): void {
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }

        res.writeHead(200);
        res.end(data);
      });
    });
  };

  private onError = (error: Error): void => {
    printHttpServerErrorMsg(this.port, error);
    this.server.close();
  };
}
