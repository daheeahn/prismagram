import { ROOM_FRAGMENT } from "../../../fragment";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeRoom: async (_, { roomId }, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const canSee = await prisma.$exists.room({
        participants_some: { id: user.id }
      });
      if (canSee) {
        // 이 대화에 참여자이면
        return prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
      } else {
        throw Error("You can't see this");
      }
    }
  }
};
