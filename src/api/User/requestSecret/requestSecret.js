import { generateSecret } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, { email }) => {
      const loginSecret = generateSecret();
      console.log(loginSecret, "&&&&&&&&&&&&&&&&&&");
      try {
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        return true;
      } catch (error) {
        // (error) 없어도 되네
        console.log(error, "?????????????????");
        return false;
      }
    }
  }
};
