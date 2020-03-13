import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, firstName = "", lastName = "", bio = "" } = args
    ) => {
      const exists = await prisma.$exists.user({
        OR: [{ username }, { email }]
      });
      if (exists) {
        throw Error("this username / email is already taken");
      }
      return prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio
      });
    }
  }
};
