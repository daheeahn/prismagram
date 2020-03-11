import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullPost: (_, { id }) => prisma.post({ id })
  }
};
