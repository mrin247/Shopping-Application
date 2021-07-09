// ! Import Dependencies
const slugify = require("slugify");

// ! Import Product Model
const Product = require("../models/product");

// ! This controller create product from "/product/creat" route
exports.postCreateProduct = (req, res, next) => {
  // Destructure input from req body
  const { name, price,quantity, description, category, updatedAt } = req.body;
  let productPhotos = [];
  if(req.files.length > 0){
      productPhotos = req.files.map((file) => {
          return {img: file.filename }
      });
  }

  // Create new product from Destructured body parameters
  const _product = new Product({
    name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPhotos,
    category,
    createdBy: req.user._id,
    updatedAt,
  });

  // Save User to DB
  _product.save((err, product) => {
    if (err) return res.status(400).json({ err });

    if (product) {
      return res.status(201).json({ product });
    }
  });
};
