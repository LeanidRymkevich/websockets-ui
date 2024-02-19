import { RawData } from 'ws';

import IData from '@src/types/interfaces/IData';
import { extractErrorMsg } from '@src/utils/error_util';

const parseRawData = (rawData: RawData): IData => {
  try {
    const obj: unknown = JSON.parse(rawData.toString());
    const { id, type, data } = obj as IData;

    if (typeof id !== 'number' || typeof type !== 'string' || !data)
      throw new Error(
        'Invalid request body! Some or all of mandatory fields - id, type, data are missing!'
      );

    return { type, id, data };
  } catch (err) {
    const msg = extractErrorMsg(err, 'error while parsing raw data');
    throw new Error(msg);
  }
};

export { parseRawData };
