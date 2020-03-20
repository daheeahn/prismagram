import multer from "multer";

// 물터를 써서 이 안에 업로드 하고 싶습니다. 업로드된 파일들을 이 폴더에 저장할 것 입니다.
// 서버에 오는 업로드된 파일의 저장 위치를 알려주는거야

const upload = multer({ dest: "uploads/" });
export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
  const {
    file: { path }
  } = req;
  console.log("🥶", path);
  return res.json({ path });
  // 이 url 써서 누가 요청하면, multer가 들어오는 파일 중간에 가로채서, 파일 업로드하고, file이라는 obj 제공.
  // upload.single('photo') 이게 미들웨어야. 그리고 이 /api/upload로 보내지는 파일은 이름이 file이여야 해!
};
