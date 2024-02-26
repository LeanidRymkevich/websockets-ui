import { RawData } from 'ws';

import IData from '@src/types/interfaces/IData';
import { IRegData } from '@src/types/interfaces/IRegData';
import IAddShipsData from '@src/types/interfaces/IAddShipsData';
import IShipPosition from '@src/types/interfaces/IShipPosition';

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

const getAddShipsData = ({ data }: IData): IAddShipsData => {
  let obj: unknown;

  try {
    obj = JSON.parse(String(data));
  } catch {
    throw new DataParsingError('Invalid data field JSON');
  }

  const { gameId, ships, indexPlayer } = obj as IAddShipsData;

  if (
    !gameId ||
    !indexPlayer ||
    typeof gameId !== 'string' ||
    typeof indexPlayer !== 'string' ||
    !Array.isArray(ships)
  ) {
    throw new DataParsingError(
      'Invalid values of gameId, ships or indexPlayer'
    );
  }

  ships.forEach(
    ({ position, direction, length, type }: IShipPosition): void => {
      const { x, y } = position;
      if (
        typeof x !== 'number' ||
        typeof y !== 'number' ||
        x < 0 ||
        y < 0 ||
        typeof direction !== 'boolean' ||
        typeof length !== 'number' ||
        length < 1 ||
        !(
          type === 'huge' ||
          type === 'large' ||
          type === 'medium' ||
          type === 'small'
        )
      ) {
        throw new DataParsingError('Invalid values of ships position params');
      }
    }
  );

  return obj as IAddShipsData;
};

export { parseRawData, getRegData, getIdxRoomFromReq, getAddShipsData };
