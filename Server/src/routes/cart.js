// ! Import Dependencies
const express = require('express');
const slugify = require('slugify');

// ! Import Model
const { postAddToCart } = require('../controllers/cart');


// ! Import Middlewares
const { requireSignin, userMiddleware } = require('../utill/middleware');

//  ! Set Router Module
const router = express.Router();

// ! GET Requests


// ! POST Requests
router.post('/user/cart/add-to-cart', requireSignin, userMiddleware , postAddToCart);

// ! Export Router
module.exports = router;