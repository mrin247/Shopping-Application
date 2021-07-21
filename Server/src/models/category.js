// ! Install Dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

//! Create categogrySchema
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    type:{type:String},
    categoryImage: { type: String },
    parentId: { type: String },
  },
  { timestamps: true }
);

// ! Exports categorySchema as Category
module.exports = mongoose.model("Category", categorySchema);
