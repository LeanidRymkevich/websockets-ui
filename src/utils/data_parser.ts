import { RawData } from 'ws';

import IData from '@src/types/interfaces/IData';
import { IRegData } from '@src/types/interfaces/IRegData';

import DataParsingError from '@src/errors/DataParsingError';

import { extractErrorMsg } from '@src/utils/error_util';

const parseRawData = (rawData: RawData): IData => {
  try {
    const obj: unknown = JSON.parse(rawData.toString());
    const { id, type, data } = obj as IData;

    if (
      typeof id !== 'number' ||
      typeof type !== 'string' ||
      data === undefined
    )
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
  let obj: unknown;

  try {
    obj = JSON.parse(String(data));
  } catch {
    throw new DataParsingError('Invalid data field JSON');
  }

  const { name, password } = obj as IRegData;

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

const getIdxRoomFromReq = ({ data }: IData): string => {
  let obj: unknown;

  try {
    obj = JSON.parse(String(data));
  } catch {
    throw new DataParsingError('Invalid data field JSON');
  }

  const { indexRoom } = obj as { indexRoom: string };

  if (typeof indexRoom !== 'string' || !indexRoom) {
    throw new DataParsingError('Invalid type or value of indexRoom');
  }

  return indexRoom;
};

export { parseRawData, getRegData, getIdxRoomFromReq };
