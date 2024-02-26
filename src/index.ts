import { httpServerPort, wsServerPort } from '@src/constants';

import HTTPServer from '@src/HTTPServer';
import WSServer from '@src/WSServer';

new HTTPServer(httpServerPort).start();
new WSServer(wsServerPort);
