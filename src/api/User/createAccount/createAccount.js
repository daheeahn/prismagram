import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, firstName = "", lastName = "", bio = "" } = args
    ) => {
      return null;
      const user = await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio
      });
      return user;
    }
  }
};
