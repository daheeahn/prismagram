import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, { username }) => {
      return prisma.user({ username });
    }
  }
};
