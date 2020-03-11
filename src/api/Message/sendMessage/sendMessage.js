import { ROOM_FRAGMENT } from "../../../fragment";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendMessage: async (
      _,
      { roomId, message, toId },
      { request, isAuthenticated }
    ) => {
      isAuthenticated(request);
      const { user } = request;

      let room;
      if (roomId === undefined) {
        // room이 없으면 새로 만들어준다. 그 사람과의 대화가 처음일테니!
        if (user.id === toId) {
          throw Error("Same user");
        }
        // 내 자신과의 대화 만들지 않기 위함.
        room = await prisma
          .createRoom({
            participants: {
              connect: [{ id: toId }, { id: user.id }]
            }
          })
          .$fragment(ROOM_FRAGMENT);
      } else {
        room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
      }

      if (!room) {
        throw Error("Room not found");
      }

      // roomId가 존재하면 toId가 없을거고, roomId가 있으면 toId가 없을거라서 좀 복잡해.
      // request에서 오는 user가 아닌 다른 participant를 가져오려는거야.
      const getTo = room.participants.find(p => p.id !== user.id);
      const newMessage = await prisma.createMessage({
        text: message,
        from: { connect: { id: user.id } },
        to: { connect: { id: roomId ? getTo.id : toId } },
        room: { connect: { id: room.id } }
      });
      return newMessage;
    }
  }
};
