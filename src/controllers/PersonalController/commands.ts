import WebSocket from 'ws';

import DataParsingError from '@src/errors/DataParsingError';
import RegistrationError from '@src/errors/RegistrationError';

import EPersonalRespTypes from '@src/types/enums/EPersonalRespTypes';
import IData from '@src/types/interfaces/IData';
import IPlayer from '@src/types/interfaces/IPlayer';
import IPlayersStorage from '@src/types/interfaces/IPlayersStorage';
import { IRegData } from '@src/types/interfaces/IRegData';
import ECommonRespTypes from '@src/types/enums/ECommonRespTypes';
import ICommonController from '@src/types/interfaces/ICommonController';

import CustomDB from '@src/data/CustomDB';
import { getRegData } from '@src/utils/data_parser';
import { reportOperationRes } from '@src/utils/console_printer';
import CommonController from '@src/controllers/CommonController';

const registerPlayer = (
  data: IData,
  socketMap: Record<string, WebSocket>,
  socketId: string
): void => {
  const storage: IPlayersStorage = CustomDB.getInstance().playersStorage;
  const socket = socketMap[socketId];
  const commonController: ICommonController = CommonController.getInstance();

  let regData: IRegData | null = null;
  let player: IPlayer | null = null;

  if (!socket) return;

  try {
    regData = getRegData(data);
    player = storage.addPlayer({ ...regData, socketId });

    socket.on('close', player.leave);
    socket.on('error', player.leave);

    const response = {
      type: EPersonalRespTypes.REGISTRATION,
      data: JSON.stringify({
        name: player!.name,
        index: player!.index,
        error: false,
        errorText: '',
      }),
      id: 0,
    };

    reportOperationRes(EPersonalRespTypes.REGISTRATION, response);
    socket.send(JSON.stringify(response));

    commonController.execute(ECommonRespTypes.UPDATE_ROOM, socketMap);
    commonController.execute(ECommonRespTypes.UPDATE_WINNERS, socketMap);
  } catch (err) {
    if (err instanceof RegistrationError || err instanceof DataParsingError) {
      const response = {
        type: EPersonalRespTypes.REGISTRATION,
        data: JSON.stringify({
          name: regData ? regData.name : '',
          index: player ? player.index : '',
          error: true,
          errorText: err.message,
        }),
        id: 0,
      };

      reportOperationRes(EPersonalRespTypes.REGISTRATION, response);
      socket.send(JSON.stringify(response));
    }

    throw err;
  }
};

export { registerPlayer };
