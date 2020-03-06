import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, { term }) =>
      prisma.posts({
        where: {
          OR: [{ locations_starts_with: term }, { caption_starts_with: term }]
        }
      })
  }
};
