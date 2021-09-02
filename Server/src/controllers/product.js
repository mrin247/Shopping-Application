// ! Import Dependencies
const slugify = require("slugify");

// ! Import Product Model
const Product = require("../models/product");

// ! Import Category Model
const Category = require("../models/category");

// ! This controller create product from "/product/creat" route
exports.postCreateProduct = (req, res, next) => {
  // Destructure input from req body
  const { name, price, quantity, description, category, updatedAt } = req.body;
  let productPhotos = [];
  if (req.files.length > 0) {
    productPhotos = req.files.map((file) => {
      return { img: file.filename };
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

// ! This controller fetch product by slug from "products/:slug" route
exports.getProductsBySlug = (req, res, next) => {
  // Destructure parameter from request params
  const { slug } = req.params;
  // Find the category of same slug of products
  Category.findOne({ slug: slug }).exec((err, category) => {
    if (err) {
      return res.status(400).json({ error });
    }
    if (category) {
      Product.find({ category: category._id }).exec((error, products) => {
        if (error) {
          return res.status(400).json({ error });
        }

        if (category.type) {
          if (products.length > 0) {
            res.status(200).json({
              products,
              priceRange: {
                under5k: 5000,
                under10k: 10000,
                under15k: 15000,
                under20k: 20000,
                under30k: 30000,
              },
              productsByPrice: {
                under5k: products.filter((product) => product.price <= 5000),
                under10k: products.filter(
                  (product) => product.price > 5000 && product.price <= 10000
                ),
                under15k: products.filter(
                  (product) => product.price > 10000 && product.price <= 15000
                ),
                under20k: products.filter(
                  (product) => product.price > 15000 && product.price <= 20000
                ),
                under30k: products.filter(
                  (product) => product.price > 20000 && product.price <= 30000
                ),
              },
            });
          }
        } else {
          res.status(200).json({ products });
        }
      });
    }
  });
};

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if(productId){
      Product.findOne({ _id: productId })
      .exec((error, product) => {
          if(error) return res.status(400).json({ error });
          if(product){
              res.status(200).json({ product });
          }
      });
  }else{
      return res.status(400).json({ error: 'Params required' });
  }
}

exports.deleteProductById = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Product.deleteOne({ _id: productId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};

exports.getProducts = async (req, res) => {
  const products = await Product.find({})
    .select("_id name price quantity slug description productPhotos category")
    .populate({ path: "category", select: "_id name" })
    .exec();

  res.status(200).json({ products });
};