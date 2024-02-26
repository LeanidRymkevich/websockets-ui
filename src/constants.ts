import 'dotenv/config';

const DEFAULT_HTTP_SERVER_PORT = 8181;
const DEFAULT_WS_SERVER_PORT = 3000;

const httpServerPort: number =
  Number(process.env.HTTP_SERVER_PORT) || DEFAULT_HTTP_SERVER_PORT;
const wsServerPort: number =
  Number(process.env.WS_SERVER_PORT) || DEFAULT_WS_SERVER_PORT;

const MIN_SELL_NUM = 0;
const MAX_SELL_NUM = 9;

export { httpServerPort, wsServerPort, MIN_SELL_NUM, MAX_SELL_NUM };
