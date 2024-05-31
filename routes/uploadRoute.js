const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage");
const router = express.Router();

router.post(
  "/", // This is the endpoint path
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10), // This middleware handles file uploads
  productImgResize, // This middleware resizes uploaded images
  uploadImages // This is the handler function for uploading images
);

router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages); // This is the handler function for deleting images

module.exports = router;
