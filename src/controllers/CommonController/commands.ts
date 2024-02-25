import { WebSocket } from 'ws';

import CustomDB from '@src/data/CustomDB';
import IRoom from '@src/types/interfaces/IRoom';
import ECommonRespTypes from '@src/types/enums/ECommonRespTypes';

import { reportOperationRes } from '@src/utils/console_printer';

const updateRoom = (socketMap: Record<string, WebSocket>): void => {
  const rooms: IRoom[] = CustomDB.getInstance().roomsStorage.getUnfilledRooms();

  const data = rooms.map((room: IRoom) => {
    const { name, index } = room.getFirstPlayer();
    return {
      roomId: room.roomId,
      roomUsers: [
        {
          name,
          index,
        },
      ],
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

export { updateRoom };
