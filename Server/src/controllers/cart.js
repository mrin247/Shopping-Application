// ! Import Dependencies
const slugify = require("slugify");

// ! Import Cart Model
const Cart = require("../models/cart");

// ! This controller add items to Cart from "user/cart/add-to-cart" route
exports.postAddToCart = (req, res, next) => {
  // Destructure input from req body
  const userId = req.user._id;
  const cartItems = req.body.cartItems;

  Cart.findOne({ userId: userId }).exec((err, cart) => {
    if (err) return res.status(400).json({ err });

    if (cart) {
      // If cart is already there for a user
      // Check if there is a same item
      const product = cartItems.product;
      const item = cart.cartItems.find((c) => c.product == product); // will retrun object of same item
      let condition, update;
      if (item) {
        // If item is already in the cart
        const prevQuantity = item.quantity; // quantity of the previously existed product
        const newQuantity = cartItems.quantity; // Update Quantitiy of the previous item with newQuantity

        // Condition to update
        condition = { userId: userId, "cartItems.product": product };

        // Update action
        update = {
          $set: {
            "cartItems.$": {
              /// to update that product only
              ...cartItems, // spread & fetch previous cartItems
              quantity: newQuantity + prevQuantity, //update quantity
            },
          },
        };
      } else {
        // If Item is in the cart
        // push cart item to existing cart for user

        // Condition to update
        condition = { userId: userId };

        // Update action
        update = { $push: { cartItems: cartItems } };
      }

	  // Find and Update function
      Cart.findOneAndUpdate(condition, update, {
        useFindAndModify: false,
      }).exec((err, cartItem) => {
        if (err) return res.status(400).json({ err });
        if (cartItem) return res.status(200).json({ cart: cart });
      });

    } else {
      // If no cart exists for user
      // Create new Cart from Destructured body parameters
      const _cart = new Cart({ userId, cartItems });

      // Save userId to DB
      _cart.save((err, cart) => {
        if (err) return res.status(400).json({ err });
        if (cart) return res.status(200).json({ cart });
      });
    }
  });
};
