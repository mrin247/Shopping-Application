// ! Import Dependencies
const express = require("express");
const { check } = require("express-validator");

// ! Import middlewares
const { requireSignin, upload } = require("../../utill/middleware");

//  ! Set Router Module
const router = express.Router();

// ! Import Controllers for authentication from admin/auth
const {
  postSignin,
  postSignup,
  postSignout,
} = require("../../controllers/admin/auth");

// ! Import Controllers for validation from validators/auth
const {
  isValidatedReq,
  validateSignupReq,
  validateSigninReq,
} = require("../../validators/auth");

const { createPage } = require("../../controllers/admin/page");

//  ! GET Routes

//  ! POST Routes
router.post("/page/create", upload.fields([
    {name: 'banners'},
    {name: 'products'}
]),createPage);

// router.post("/profile",requireSignin, (req,res)=>{
//     res.status(200).json({
//         user: "profile"
//     });
// });

//  ! Export router module
module.exports = router;
