import EPersonalRespTypes from '@src/types/enums/EPersonalRespTypes';
import IData from '@src/types/interfaces/IData';
import ITypedController from '@src/types/interfaces/ITypedController';
import AbstractController from './AbstractController';
import WebSocket from 'ws';
import { IRegData } from '@src/types/interfaces/IRegData';
import { getRegData } from '@src/utils/data_parser';
import { IPlayer } from '@src/types/interfaces/IPlayer';
import IPlayersStorage from '@src/types/interfaces/IPlayersStorage';
import CustomDB from '@src/data/CustomDB';
import RegistrationError from '@src/errors/RegistrationError';
import DataParsingError from '@src/errors/DataParsingError';

// TODO: add appropriate type
// eslint-disable-next-line @typescript-eslint/ban-types
const commands: Record<EPersonalRespTypes, Function> = {
  [EPersonalRespTypes.ADD_USER_TO_ROOM]: () =>
    console.log(EPersonalRespTypes.ADD_USER_TO_ROOM),
  [EPersonalRespTypes.CREATE_ROOM]: () =>
    console.log(EPersonalRespTypes.CREATE_ROOM),
  [EPersonalRespTypes.REGISTRATION]: () =>
    console.log(EPersonalRespTypes.REGISTRATION),
};

export default class PersonalController
  // eslint-disable-next-line @typescript-eslint/ban-types
  extends AbstractController<EPersonalRespTypes, Function>
  implements ITypedController
{
  public constructor() {
    super(commands);
  }

  public execute = (data: IData, socket: WebSocket): void => {
    this.commands[data.type as EPersonalRespTypes](data, socket);
  };

  private registerPlayer = (data: IData, socket: WebSocket): void => {
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
}
