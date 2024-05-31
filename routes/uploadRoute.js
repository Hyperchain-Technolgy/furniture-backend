const express = require('express');
const { uploadImages } = require('../controller/uploadCtrl');
const { createProduct } = require('../controller/productCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImage');
const router = express.Router();

router.post(
  '/',
  authMiddleware,
  isAdmin,
  uploadPhoto,
  productImgResize,
  uploadImages
);

router.post(
  '/',
  authMiddleware,
  isAdmin,
  uploadPhoto,
  productImgResize,
  createProduct
);

module.exports = router;
