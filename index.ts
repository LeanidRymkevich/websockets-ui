import 'dotenv/config';

import { httpServer } from '@src/http_server/index';

const port: string = process.env.PORT || '8181';

console.log(`Start static http server on the ${port} port!`);
httpServer.listen(port);
