const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  removeFromWishlist,
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto } = require('../middlewares/uploadImage');
const router = express.Router();

router.post('/create', authMiddleware, isAdmin, uploadPhoto, createProduct);

router.put('/update/:id', uploadPhoto, updateProduct);

router.get("/:id", getaProduct);
router.put("/wishlist", authMiddleware, addToWishlist);
router.delete("/wishlist", authMiddleware, removeFromWishlist);
router.put("/rating", authMiddleware, rating);

router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

router.get("/", getAllProduct);

module.exports = router;