import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: (_, { id }) => {
      return prisma.user({ id });
    }
  }
};
