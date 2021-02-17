import path from 'path';
import express from 'express';
import multer from 'multer';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Verify File Types
const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png/;

  const isValidExtName = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  ); // Returns Boolean

  // every file has mime type - example: "image/jpg"
  const mimetype = filetypes.test(file.mimetype); // Returns Boolean

  if (isValidExtName && mimetype) {
    return cb(null, true);
  } else {
    cb('images only');
  }
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// ------------------------------------------

router.post(
  '/api/upload',
  protect,
  admin,
  upload.single('image'),
  (req, res) => {
    res.json(`/${req.file.path}`);
  }
);

export default router;
