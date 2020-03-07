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
  }
};
