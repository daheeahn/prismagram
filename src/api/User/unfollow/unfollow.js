import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    unfollow: async (_, { id }, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: { following: { disconnect: { id } } }
        });
        return true;
      } catch {
        return false;
      }
    }
  }
};
