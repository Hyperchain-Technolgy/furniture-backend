const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniquesuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
});

const productImgResize = async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next();
  req.body.images = [];

  await Promise.all(
    req.files.map(async (file) => {
      const resizedPath = path.join('public/images/products/', file.filename);

      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(resizedPath);

      // Add resized image path to req.body.images
      req.body.images.push({ url: resizedPath.replace('public/', '') });

      // Remove original file
      fs.unlinkSync(file.path);
    })
  );

  next();
};

module.exports = { uploadPhoto, productImgResize };
