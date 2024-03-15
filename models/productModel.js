const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var furnitureSchema = new mongoose.Schema(
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
  brand: {
   type: String,
   default: "Your Brand Name", // replace with your brand name
  },
  quantity: {
   type: Number,
   required: true,
  },
  sold: {
   type: Number,
   default: 0,
  },
  images: [
   {
    public_id: String,
    url: String,
   },
  ],
  color: [],
  material: { // new field for furniture material
   type: String,
   required: true,
  },
  dimensions: { // new field for furniture dimensions
   height: Number,
   width: Number,
   depth: Number,
  },
  ratings: [
   {
    star: Number,
    comment: String,
    postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   },
  ],
  totalrating: {
   type: String,
   default: 0,
  },
 },
 { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Furniture", furnitureSchema);
