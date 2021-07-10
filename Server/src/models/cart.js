// ! Install Dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

//! Create cartSchema
const cartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// ! Exports cartSchema as Category
module.exports = mongoose.model("Cart", cartSchema);
