// ! Import Dependencies
const express = require("express");
const slugify = require("slugify");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

// ! Import Model
const {
  postCreateCategory,
  getCategories,
  updateCategories,
  deleteCategories,
} = require("../controllers/category");

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
router.get("/category/getCategory", getCategories);

// ! POST Requests
router.post(
  "/category/create",
  requireSignin,
  adminMiddleware,
  upload.single("categoryImage"),
  postCreateCategory
);

router.post(
  "/category/update",

  upload.array("categoryImage"),
  updateCategories
);

router.post(
  "/category/delete",

  deleteCategories
);

// ! Export Router
module.exports = router;
