const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: [{ url: String }], // Modified to store image URLs directly
  color: {
    type: [String],
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  ratings: [
    {
      star: Number,
      comment: String,
      postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  totalrating: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    required: true,
  },
  stock: {
    type: Boolean,
    default: function () {
      return this.quantity > 0;
    }
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);