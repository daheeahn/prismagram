import { generateSecret, sendSecretMail } from "../../../utils";

import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, { email }, { request }) => {
      // console.log(request);
      const loginSecret = generateSecret();
      const result = await prisma.updateUser({ data: { loginSecret }, where: { email } });
      console.log('~~~~~', result)
      return loginSecret
      // mail 오류나서 잠시 이렇게

      console.log("loginSecret", new Date(), loginSecret);
      try {
        const user = await prisma.user({email})
console.log('user 있니!!!!', user)
        console.log('1')
        await sendSecretMail(email, loginSecret);
        console.log('2')
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        console.log('3')
        return true;
      } catch (error) {
        // (error) 없어도 되네
        console.log("requestSecret error", error);
        return false;
      }
    }
  }
};
