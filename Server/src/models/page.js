// ! Install Dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

//! Create categogrySchema
const pageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    banners: [
      {
        img: { type: String },
        navigateTo: { type: String },
      },
    ],
    products: [
      {
        img: { type: String },
        navigateTo: { type: String },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// ! Exports categorySchema as Category
module.exports = mongoose.model("Page", pageSchema);
