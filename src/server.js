require("dotenv").config(); // 여기서 포트 읽어오도록 할 수 있어/ .env 파일에 PORT를 추가하면 돼

import { GraphQLServer } from "graphql-yoga";
import dotenv from "dotenv";
import logger from "morgan";
import path from "path";
import schema from "./schema";

dotenv.config({ path: path.resolve(__dirname, ".env") });
console.log("💞");
console.log(__dirname);
console.log(process.env.PORT);

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

// express 서버에 접근. logger 미들웨어를 사용하도록 할거야. 사실은 모건 모듈이지.
server.express.use(logger("dev"));

server.start({ port: PORT }, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}); // port: dotenv config에서 포트 읽어오도록 할 수 있어
