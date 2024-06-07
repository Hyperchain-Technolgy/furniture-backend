const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage");
const router = express.Router();

router.post(
  "/create", // This is the endpoint path
  authMiddleware,
  isAdmin,
  uploadPhoto.single("image"), // This middleware handles single file upload
  uploadImages // This is the handler function for uploading images
);

router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages); // This is the handler function for deleting images

module.exports = router;