// ! Import Dependencies
const express = require("express");
const { check } = require("express-validator");

//  ! Set Router Module
const router = express.Router();

// ! Import Controllers for authentication from auth
const { postSignin, postSignup } = require("../controllers/auth");

// ! Import Controllers for validation from validators/auth
const {
  validateSignupReq,
  isValidatedReq,
  validateSigninReq,
} = require("../validators/auth");

//  ! GET Routes

//  ! POST Routes
router.post("/signup", validateSignupReq, isValidatedReq, postSignup);

router.post("/signin", validateSigninReq, isValidatedReq, postSignin);

// router.post("/profile", requireSignin, (req, res) => {
//   res.status(200).json({
//     user: "profile",
//   });
// });

//  ! Export router module
module.exports = router;
