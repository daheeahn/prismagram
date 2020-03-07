import { prisma } from "../../../../generated/prisma-client"; // context ({request} 부분)에  prisma 넣으면 얘 필요없지만 autocomplete가 되지 않아.

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      // isAuth~ 여기서~~~~~~
      isAuthenticated(request);
      // 이걸 context에 넣어도 됨!
      const { username, email, firstName, lastName, bio } = args;
      const { user } = request;
      return prisma.updateUser({
        where: { id: user.id },
        data: { username, email, firstName, lastName, bio }
      });
      // return이 마지막 statement라 서버에서 이 promise가 자동으로 resolve 돼서 브라우저에게 결과를 전달하길 기다려주거든. 이래도 괜찮아.
    }
  }
};
