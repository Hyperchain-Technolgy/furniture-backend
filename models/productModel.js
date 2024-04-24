const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
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
    images: [{
      url: String,
      alt: String
    }],
    color: {
      type: [String],
      required: true
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
    stock: {
      type: Number,
      required: true,
    },
    dimensions: {
      width: Number,
      height: Number,
      depth: Number
    }
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
