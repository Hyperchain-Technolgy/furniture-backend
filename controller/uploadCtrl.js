const fs = require("fs");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const uploadImages = asyncHandler(async (req, res) => {
  try {
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      urls.push(path); // Save path as string
    }
    res.json(urls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.images = product.images.filter(img => img._id.toString() !== req.body.imageId);
    await product.save();
    
    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  uploadImages,
  deleteImages,
};
