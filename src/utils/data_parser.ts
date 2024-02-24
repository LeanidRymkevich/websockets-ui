import { RawData } from 'ws';

import IData from '@src/types/interfaces/IData';
import { IRegData } from '@src/types/interfaces/IRegData';

import DataParsingError from '@src/errors/DataParsingError';

import { extractErrorMsg } from '@src/utils/error_util';

const parseRawData = (rawData: RawData): IData => {
  try {
    const obj: unknown = JSON.parse(rawData.toString());
    const { id, type, data } = obj as IData;

    if (typeof id !== 'number' || typeof type !== 'string' || !data)
      throw new DataParsingError(
        'Invalid request body! Some or all of mandatory fields - id, type, data are missing!'
      );

    return { type, id, data };
  } catch (err) {
    const msg = extractErrorMsg(err, 'error while parsing raw data');
    throw new Error(msg);
  }
};

const getRegData = ({ data }: IData): IRegData => {
  const { name, password } = JSON.parse(String(data)) as IRegData;

  if (
    typeof name !== 'string' ||
    !name ||
    typeof password !== 'string' ||
    !password
  ) {
    throw new DataParsingError('Invalid type or value of name or password');
  }

  return { name, password };
};

export { parseRawData, getRegData };
