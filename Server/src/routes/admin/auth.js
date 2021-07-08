const express = require("express");
const { check } = require("express-validator");
//  Set Router Module
const router = express.Router();

// Import models
const {
  postSignin,
  postSignup,
  requireSignin,
} = require("../../controllers/admin/auth");
const { isValidatedReq, validateSignupReq , validateSigninReq } = require("../../validators/auth");

//  GET Routes

//  POST Routes
router.post("/admin/signup", validateSignupReq, isValidatedReq, postSignup);

router.post("/admin/signin",validateSigninReq, isValidatedReq, postSignin);

// router.post("/profile",requireSignin, (req,res)=>{
//     res.status(200).json({
//         user: "profile"
//     });
// });

//  Export router module
module.exports = router;
