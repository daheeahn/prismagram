import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

import { makeExecutableSchema } from "graphql-tools";
import path from "path";

const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js")); // resolver가 아닌 다른 js 파일 두면 안되겠지 api 아래에~!!

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers)
});

export default schema;
