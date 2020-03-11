import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    newMessage: {
      subscribe: (_, { roomId }) => {
        return prisma.$subscribe
          .message({
            AND: [
              { mutation_in: "CREATED" },
              {
                node: { room: { id: roomId } }
              }
            ]
          })
          .node();
      },
      resolve: payload => {
        // 기본적으로 payload를 주는 함수다?
        // 구독 payload도 가지고 있어. 스키마 보면 알 수 있다~
        return payload; // payload를 변경하거나 확인할 수도 있어,,, // 이걸 return 안하면 리스닝하고 있는 구독의 리턴값이 data: null이 됨
      }
    }
  }
};
