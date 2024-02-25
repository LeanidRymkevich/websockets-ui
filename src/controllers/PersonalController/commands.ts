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
import IRoomsStorage from '@src/types/interfaces/IRoomsStorage';
import ICustomDB from '@src/types/interfaces/ICustomDB';
import IRoom from '@src/types/interfaces/IRoom';

import CustomDB from '@src/data/CustomDB';
import { getIdxRoomFromReq, getRegData } from '@src/utils/data_parser';
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

  if (!socket)
    throw new Error(`Socket with id "${socketId}" not found in WSS socket map`);

  try {
    regData = getRegData(data);
    player = storage.addPlayer({ ...regData, socket, socketId });

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

const createRoom = (
  _data: IData,
  socketMap: Record<string, WebSocket>,
  socketId: string
): void => {
  const db: ICustomDB = CustomDB.getInstance();
  const roomsStorage: IRoomsStorage = db.roomsStorage;
  const playersStorage: IPlayersStorage = db.playersStorage;
  const commonController: ICommonController = CommonController.getInstance();

  const socket = socketMap[socketId];
  const player: IPlayer | null = playersStorage.getPlayerBySocketId(socketId);

  if (!socket)
    throw new Error(`Socket with id "${socketId}" not found in WSS socket map`);
  if (!player) throw new Error(`User with id "${socketId} not found in db"`);

  roomsStorage.addRoom();
  commonController.execute(ECommonRespTypes.UPDATE_ROOM, socketMap);
};

const addUserToRoom = (
  data: IData,
  socketMap: Record<string, WebSocket>,
  socketId: string
): void => {
  const db: ICustomDB = CustomDB.getInstance();
  const roomsStorage: IRoomsStorage = db.roomsStorage;
  const playersStorage: IPlayersStorage = db.playersStorage;
  const commonController: ICommonController = CommonController.getInstance();

  const socket = socketMap[socketId];
  const roomId: string = getIdxRoomFromReq(data);
  const player: IPlayer | null = playersStorage.getPlayerBySocketId(socketId);
  const room: IRoom | null = roomsStorage.getRoomById(roomId);

  if (!socket)
    throw new Error(`Socket with id "${socketId}" not found in WSS socket map`);
  if (!player) throw new Error(`User with id "${socketId}" not found in db"`);
  if (!room) throw new Error(`Room with id "${roomId}" not found in db"`);

  const firstPlayer: IPlayer | null = room.getFirstPlayer();
  const secondPlayer: IPlayer | null = room.getSecondPlayer();

  if (
    (!!firstPlayer && firstPlayer.getSocketId() === socketId) ||
    (!!secondPlayer && secondPlayer.getSocketId() === socketId)
  ) {
    throw new Error(
      `User with id "${socketId}" are already in the room with id "${roomId}"`
    );
  }

  room.addPlayer(player);
  player.enterRoom(room);
  commonController.execute(ECommonRespTypes.UPDATE_ROOM, socketMap);
};

export { registerPlayer, createRoom, addUserToRoom };
