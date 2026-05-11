import multer from "multer";

const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "./uplodes");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

export default upload;