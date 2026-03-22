const { URL } = require('node:url');
const { v2: cloudinary } = require('cloudinary');

const configureCloudinary = () => {
  if (process.env.CLOUDINARY_URL) {
    const cloudinaryUrl = new URL(process.env.CLOUDINARY_URL);

    cloudinary.config({
      cloud_name: cloudinaryUrl.hostname,
      api_key: cloudinaryUrl.username,
      api_secret: cloudinaryUrl.password,
      secure: true,
    });

    return;
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
};

configureCloudinary();

const uploadToCloudinary = (file) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'contacts',
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result.secure_url);
      }
    );

    uploadStream.end(file.buffer);
  });

module.exports = {
  uploadToCloudinary,
};
