// ! Import Dependencies
const express = require("express");
const slugify = require("slugify");
const multer = require("multer");
const shortid = require("shortid");
const path = require('path');

// ! Import Model
const { postCreateProduct, getProductsBySlug } = require("../controllers/product");

// ! Import Middlewares
const { requireSignin, adminMiddleware } = require("../utill/middleware");

//  ! Use Dependencies
//  Set Router Module
const router = express.Router();

//  For file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// ! GET Requests
router.get('/product/:slug', getProductsBySlug);

// ! POST Requests
router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPhotos"),
  postCreateProduct
);

// ! Export Router
module.exports = router;