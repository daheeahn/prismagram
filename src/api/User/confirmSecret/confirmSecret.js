import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    confirmSecret: async (_, { email, secret }) => {
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        // return JWT token
        return "TOKEN";
      } else {
        throw Error("Wrong email, secret combination");
      }
    }
  }
};
