import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    upload: async (_, { caption, files }, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      // post를 먼저 만들고 그 다음에 files를 따로 만들어서 미리 만들어둔 post에 파일을 첨부해보자.
      const post = await prisma.createPost({
        caption,
        user: { connect: { id: user.id } }
      });
      files.forEach(async file => {
        await prisma.createFile({
          url: file,
          post: { connect: { id: post.id } }
        });
      });
      return post;
    }
  }
};
