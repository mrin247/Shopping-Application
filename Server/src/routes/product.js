const express = require('express');
//const {  } = require('../controller/category');
const { requireSignin, adminMiddleware } = require('../utill/middleware');
const {  getProductsBySlug, getProductDetailsById, postCreateProduct } = require('../controllers/product');
const multer = require('multer');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage });

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), postCreateProduct);
router.get('/products/:slug', getProductsBySlug)
//router.get('/category/getcategory', getCategories);
router.get('/product/:productId', getProductDetailsById);

module.exports = router;