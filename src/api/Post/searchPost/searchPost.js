import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, { term }) =>
      prisma.posts({
        where: {
          OR: [{ location_starts_with: term }, { caption_starts_with: term }]
        }
      })
  }
};
