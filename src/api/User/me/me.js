import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    me: (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      return prisma.user({ id: request.user.id });
    }
  }
};
