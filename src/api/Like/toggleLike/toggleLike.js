import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, { postId }, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const filterOpts = {
        AND: [{ user: { id: user.id } }, { post: { id: postId } }]
      };
      try {
        const existingLike = await prisma.$exists.like(filterOpts);
        if (existingLike) {
          // 좋아요가 이미 존재하면
          await prisma.deleteManyLikes(filterOpts);
        } else {
          await prisma.createLike({
            user: { connect: { id: user.id } },
            post: { connect: { id: postId } }
          }); // create disconnect connect 있다
        }
        return true;
      } catch (error) {}
    }
  }
};
