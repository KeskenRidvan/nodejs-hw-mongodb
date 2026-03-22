const multer = require('multer');
const createHttpError = require('http-errors');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    if (!file.mimetype.startsWith('image/')) {
      return callback(createHttpError(400, 'Only image files are allowed'));
    }

    return callback(null, true);
  },
});

module.exports = upload;
