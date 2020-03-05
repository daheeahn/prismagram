import { ExtractJwt, Strategy } from "passport-jwt";

// dotenv가 잘 작동하지 않으니까 utils.js에서 이 코드 모두 복사! 버그 해결되길...
import dotenv from "dotenv";
import passport from "passport";
import path from "path";
import { prisma } from "../generated/prisma-client";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization 헤더에서 jwt 찾는 역할
  secretOrKey: process.env.JWT_SECRET
};

// 토큰을 암호화하기 위한 문자열 = secret
// { id: 1 } 이런 사용자 정보가 암호화되어서 토큰에 담겨. JWT는 토큰을 입력받아서 정보 해석하고 해석된 정보를 콜백함수로 전달해줘.
// verifyUser 함수 만들자.
// 확인용 callback 함수도 추가. 옵션이 잘 맞게 적용되었을 때 JwtStrategy 함수가 토큰을 해석할거야.
// 우리가 사용자 찾았을 때 호출하는 함수야.
// user를 payload의 정보로 찾을 수 있어야 해.

const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
      // or create a new account. 토큰에 id가 있고 사용자가 없다면 계정을 생성해도 되지!
    }
  } catch (error) {
    return done(error, false);
  }
};

// 미들웨어 함수야. passport는 쿠키와 세션 작업하기 좋아. 쿠키를 가져오고 만들어주고 모든 일을 한다.
// passport에 어떤 것도 입력되지 않기를 원해서 session을 false로
// passportrk 함수에 사용자 정보를 전달해줄거야.
// verifyUser에서 사용자를 받아온 후에, 사용자가 존재한다면 그 사용자 정보를 req 객체에 붙여주는거야.
export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
    // express에서는 미들웨어를 지나서 라우트가 실행돼. 토큰을 받아서 해석,사용자찾고 사용자 존재하면 req객체에 사용자 추가하고 나면 graphql 함수를 실행하는거야.
    // 로그인 되어 있다면 모든 gql 요청에 사용자 정보가 추가되어서 요청되는거지.
  })(req, res, next); // 함수가 리턴되는거야. Fn(req, res, next) 인거야. 이경우에는 실행해야 하는 함수가 gql 함수래. (?)

passport.use(new Strategy(jwtOpts, verifyUser));
passport.initialize();
