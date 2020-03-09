import { COMMENT_FRAGMENT } from "../../../fragment";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullPost: async (_, { id }) => {
      const post = await prisma.post({ id });
      const comments = await prisma
        .post({ id })
        .comments()
        .$fragment(COMMENT_FRAGMENT);
      const likeCount = await prisma
        .likesConnection({
          where: { post: { id } }
        })
        .aggregate()
        .count();
      const files = await prisma.post({ id }).files();
      const user = await prisma.post({ id }).user();
      return { post, comments, likeCount, files, user };
    }
  }
};
