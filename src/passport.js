import JwtStrategy from "passport-jwt";
// dotenv가 잘 작동하지 않으니까 utils.js에서 이 코드 모두 복사! 버그 해결되길...
import dotenv from "dotenv";
import passport from "passport";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

const jwtOpts = {
  jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization 헤더에서 jwt 찾는 역할
  secret: process.env.JWT_SECRET
};

// 토큰을 암호화하기 위한 문자열 = secret

passport.use(new JwtStrategy(jwtOpts, jwt_payload));

// { id: 1 } 이런 사용자 정보가 암호화되어서 토큰에 담겨. JWT는 토큰을 입력받아서 정보 해석하고 해석된 정보를 콜백함수로 전달해줘.
// verifyUser 함수 만들자.
// 확인용 callback 함수도 추가. 옵션이 잘 맞게 적용되었을 때 JwtStrategy 함수가 토큰을 해석할거야.
// 우리가 사용자 찾았을 때 호출하는 함수야.
// user를 payload의 정보로 찾을 수 있어야 해.
// try catch 안에서 사용자를 찾는 건 다음 비디오에서!
