import { readFile } from 'fs';
import { resolve, dirname } from 'path';
import { createServer } from 'http';

const HTML_PAGE_PATH = '/front/index.html';

export const httpServer = createServer(function (req, res) {
  const __dirname: string = resolve(dirname(''));
  const file_path: string =
    __dirname + (req.url === '/' ? HTML_PAGE_PATH : `/front${req.url}`);
  readFile(file_path, function (err, data): void {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});
