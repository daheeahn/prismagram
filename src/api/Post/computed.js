import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    isLiked: async ({ id }, _, { request: { user } }) =>
      prisma.$exists.like({
        AND: [{ user: { id: user.id } }, { post: { id } }]
      }),
    likeCount: parent =>
      prisma
        .likesConnection({ where: { post: { id: parent.id } } })
        .aggregate()
        .count()
  }
};
