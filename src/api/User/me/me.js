import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      console.log("user parent", _);
      isAuthenticated(request);
      const user = await prisma.user({ id: request.user.id });
      const posts = await prisma.user({ id: request.user.id }).posts(); // prisma가 얼마나 깊게 들어가야 하는지 알거야!
      return { user, posts };
    }
  },
  User: {
    // Normal resolver...? 느낌
    // fullName // 여기서 타입은 custom resolver를 더할건데, 하나의 field만을 위한거야. 딱 field에만 필요한거! 다른 field에 영향 미치지 않아.
    // 자신의 서버에서 찾으려고 할거야. prisma에서 없으면. 그게 User 지금 이 resolver겠지.
    fullName: parent => {
      // parent는 위에 있는 resolver
      return `${parent.firstName} ${parent.lastName}`;
    }
  }
};
