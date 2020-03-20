import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, { username }) => {
      console.log("🐞");
      return prisma.user({ username });
    }
  }
};
