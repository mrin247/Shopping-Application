// ! Import Dependencies
const express = require("express");

// ! Import middlewares
const { requireSignin, upload, adminMiddleware } = require("../../utill/middleware");

// ! Import controllers
const { createPage, getPage } = require("../../controllers/admin/page");

//  ! Set Router Module
const router = express.Router();

//  ! GET Routes
router.get(`/page/:category/:type`,getPage);

//  ! POST Routes
router.post("/page/create",requireSignin, adminMiddleware ,upload.fields([
    {name: 'banners'},
    {name: 'products'}
]),createPage);

//  ! Export router module
module.exports = router;
