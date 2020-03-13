import { generateSecret, sendSecretMail } from "../../../utils";

import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, { email }, { request }) => {
      // console.log(request);
      const loginSecret = generateSecret();
      console.log("loginSecret", loginSecret);
      try {
        await sendSecretMail(email, loginSecret);
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        return true;
      } catch (error) {
        // (error) 없어도 되네
        console.log("requestSecret error", error);
        return false;
      }
    }
  }
};
