import { prisma } from "../../../../generated/prisma-client";

// 문자열 상수 만드는게 더 안전.
const EDIT = "EDIT";
const DELETE = "DELETE";

export default {
  Mutation: {
    editPost: async (
      _,
      { id, caption, location, action },
      { request, isAuthenticated }
    ) => {
      isAuthenticated(request);
      const { user } = request;
      const post = await prisma.$exists.post({ id, user: { id: user.id } });
      if (post) {
        // 이 user가 요청한 user랑 같은지 확인
        // 여기에선 where에 user: {id: user.id} 이렇게 못해 prisma에서 그렇게 못한대. 그래서 post 존재여부로 확인하는거야.

        if (action === EDIT) {
          return prisma.updatePost({
            data: { caption, location },
            where: { id }
          });
        } else if (action === DELETE) {
          return prisma.deletePost({ id });
        }
      } else {
        throw Error("You can't do that");
      }
    }
  }
};
