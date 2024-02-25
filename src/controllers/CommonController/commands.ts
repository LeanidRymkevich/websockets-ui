import { WebSocket } from 'ws';

import CustomDB from '@src/data/CustomDB';
import IRoom from '@src/types/interfaces/IRoom';
import ECommonRespTypes from '@src/types/enums/ECommonRespTypes';

import { reportOperationRes } from '@src/utils/console_printer';

const updateRoom = (socket: WebSocket): void => {
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

  const response = JSON.stringify({
    type: ECommonRespTypes.UPDATE_ROOM,
    data: JSON.stringify(data),
    id: 0,
  });

  reportOperationRes(ECommonRespTypes.UPDATE_ROOM, response);
  socket.send(JSON.stringify(response));
};

export { updateRoom };
