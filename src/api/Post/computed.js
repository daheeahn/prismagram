import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    isLiked: async ({ id }, _, { request: { user } }) =>
      prisma.$exists.like({
        AND: [{ user: { id: user.id } }, { post: { id } }]
      }),
    likeCount: ({ id }) =>
      prisma
        .likesConnection({ where: { post: { id } } })
        .aggregate()
        .count(),
    files: ({ id }) => prisma.post({ id }).files(),
    comments: ({ id }) => prisma.post({ id }).comments(),
    commentCount: ({ id }) =>
      prisma
        .commentsConnection({ where: { post: { id } } })
        .aggregate()
        .count(),
    user: ({ id }) => prisma.post({ id }).user()
  }
};
