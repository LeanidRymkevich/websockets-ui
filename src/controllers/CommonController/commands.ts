import { WebSocket } from 'ws';

import CustomDB from '@src/data/CustomDB';
import IRoom from '@src/types/interfaces/IRoom';
import ECommonRespTypes from '@src/types/enums/ECommonRespTypes';
import IWinnerInfo from '@src/types/interfaces/IWinnerInfo';
import IPlayer from '@src/types/interfaces/IPlayer';

import { reportOperationRes } from '@src/utils/console_printer';

const updateRoom = (socketMap: Record<string, WebSocket>): void => {
  const rooms: IRoom[] = CustomDB.getInstance().roomsStorage.getUnfilledRooms();

  const data = rooms.map((room: IRoom) => {
    const player: IPlayer | null = room.getFirstPlayer();
    const roomUsers = [];

    if (player) {
      const { name, index } = player;
      roomUsers.push({ name, index });
    }

    return {
      roomId: room.roomId,
      roomUsers,
    };
  });

  const response = {
    type: ECommonRespTypes.UPDATE_ROOM,
    data: JSON.stringify(data),
    id: 0,
  };

  reportOperationRes(ECommonRespTypes.UPDATE_ROOM, response);
  Object.values(socketMap).forEach((socket: WebSocket): void => {
    socket.send(JSON.stringify(response));
  });
};

const updateWinners = (socketMap: Record<string, WebSocket>): void => {
  const winners: IWinnerInfo[] =
    CustomDB.getInstance().winnersStorage.getWinners();

  const response = {
    type: ECommonRespTypes.UPDATE_WINNERS,
    data: JSON.stringify(winners),
    id: 0,
  };

  reportOperationRes(ECommonRespTypes.UPDATE_WINNERS, response);
  Object.values(socketMap).forEach((socket: WebSocket): void => {
    socket.send(JSON.stringify(response));
  });
};

export { updateRoom, updateWinners };
