// ! Import Dependencies
const express = require('express');
const slugify = require('slugify');

// ! Import Model
const { postCreateCategory, getCategories } = require('../controllers/category/category');

// ! Import Middlewares
const { requireSignin, adminMiddleware } = require('../utill/middleware');

//  ! Set Router Module
const router = express.Router();

// ! GET Requests
router.get('/category/getCategory', getCategories);

// ! POST Requests
router.post('/category/create', requireSignin, adminMiddleware, postCreateCategory);

// ! Export Router
module.exports = router;