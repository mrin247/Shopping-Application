// ! Import Dependencies
const express = require("express");
const { check } = require("express-validator");

// ! Import middlewares
const { requireSignin } = require("../../utill/middleware");

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

const { postInitialdata } = require("../../controllers/admin/initialdata");

//  ! GET Routes

//  ! POST Routes
router.post("/initialdata", postInitialdata);

// router.post("/profile",requireSignin, (req,res)=>{
//     res.status(200).json({
//         user: "profile"
//     });
// });

//  ! Export router module
module.exports = router;
