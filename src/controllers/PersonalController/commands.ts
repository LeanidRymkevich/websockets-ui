import WebSocket from 'ws';

import DataParsingError from '@src/errors/DataParsingError';
import RegistrationError from '@src/errors/RegistrationError';

import EPersonalRespTypes from '@src/types/enums/EPersonalRespTypes';
import IData from '@src/types/interfaces/IData';
import { IPlayer } from '@src/types/interfaces/IPlayer';
import IPlayersStorage from '@src/types/interfaces/IPlayersStorage';
import { IRegData } from '@src/types/interfaces/IRegData';

import CustomDB from '@src/data/CustomDB';
import { getRegData } from '@src/utils/data_parser';

const registerPlayer = (data: IData, socket: WebSocket): void => {
  const storage: IPlayersStorage = CustomDB.getInstance().playersStorage;
  let regData: IRegData | null = null;
  let player: IPlayer | null = null;

  try {
    regData = getRegData(data);
    player = storage.addPlayer({ ...regData, socket });

    const response = {
      type: EPersonalRespTypes.REGISTRATION,
      data: {
        name: player.login,
        index: player.index,
        error: false,
        errorText: '',
      },
      id: 0,
    };

    socket.send(JSON.stringify(response));
  } catch (err) {
    if (err instanceof RegistrationError || err instanceof DataParsingError) {
      const response = {
        type: EPersonalRespTypes.REGISTRATION,
        data: {
          name: regData ? regData.login : '',
          index: player ? player.index : '',
          error: true,
          errorText: err.message,
        },
        id: 0,
      };

      socket.send(JSON.stringify(response));
    }

    throw err;
  }
};

export { registerPlayer };
