import { generateToken } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    confirmSecret: async (_, { email, secret }) => {
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        // return JWT token
        return generateToken(user.id); // jwt가 id를 암호화해서 토큰을 만들어줘!
      } else {
        throw Error("Wrong email, secret combination");
      }
    }
  }
};