require("dotenv").config(); // 여기서 포트 읽어오도록 할 수 있어/ .env 파일에 PORT를 추가하면 돼

import "./passport";
import "./env";

import { GraphQLServer } from "graphql-yoga";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import logger from "morgan";
import passport from "passport";
import schema from "./schema";
import multer from "multer";
import { uploadController, uploadMiddleware } from "./upload";

// console.log("💞");
// console.log(__dirname);
// console.log(process.env.PORT);

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

// express 서버에 접근. logger 미들웨어를 사용하도록 할거야. 사실은 모건 모듈이지.
server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post("/api/upload", uploadMiddleware, uploadController); // 파일 하나 업로드 할거야

server.start({ port: PORT }, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}); // port: dotenv config에서 포트 읽어오도록 할 수 있어
