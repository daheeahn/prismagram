import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: parent => `${parent.firstName} ${parent.lastName}`,
    isFollowing: async ({ id: parentId }, _, { request: { user } }) => {
      try {
        return prisma.$exists.user({
          AND: [{ id: parentId }, { followers_some: { id: user.id } }]
        });
      } catch (error) {
        console.log("isFollowing error", error);
        return false;
      }
    },
    isSelf: ({ id: parentId }, _, { request: { user } }) => user.id === parentId
  },
  Post: {
    isLiked: async ({ id }, _, { request: { user } }) =>
      prisma.$exists.like({
        AND: [{ user: { id: user.id } }, { post: { id } }]
      })
  }
};
