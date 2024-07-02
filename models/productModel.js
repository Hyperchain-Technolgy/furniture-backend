const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Product title is required'] },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    set: value => value.replace(/\s+/g, '-').toLowerCase()
  },
  description: { type: String, required: true, },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  images: { type: [String], required: true },
  color: { type: String, required: true },
  material: { type: String, required: true },
  quantity: { type: Number, required: true },
  stock: { type: Boolean, default: function () { return this.quantity > 0; } },
  ratings: [
    {
      star: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: String,
      postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    }
  ],
  totalrating: {
    type: Number,
    default: 0
  },
});

const productModel = mongoose.models.Product || mongoose.model("product", productSchema);

module.exports = productModel;