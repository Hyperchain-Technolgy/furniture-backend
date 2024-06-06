const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    set: value => value.replace(/\s+/g, '-').toLowerCase()
  },
  description: {
    type: String,
    required: true,
    // maxlength: [500, 'Description cannot exceed 500 characters']
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number']
  },
  category: {
    type: String,
    required: true
  },
  images: [{
    url: {
      type: String,
      validate: [validator.isURL, 'Please use a valid URL'],
      images: [{ type: String }]
    }
  }],
  color: {
    type: [String],
    // required: true
  },
  material: {
    type: String,
    // required: true
  },
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
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be negative']
  },
  stock: {
    type: Boolean,
    default: function () {
      return this.quantity > 0;
    }
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);