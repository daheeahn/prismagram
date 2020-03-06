import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addComment: async (_, { text, postId }, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const comment = await prisma.createComment({});
      const comment = await prisma.createComment({
        user: { connect: { id: user.id } },
        post: { connect: { id: postId } },
        text
      });
      return comment;
    }
  }
};
