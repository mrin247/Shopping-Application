const express = require('express');
//  Set Router Module
const router = express.Router();

// Import models
const {postSignin, postSignup, requireSignin } = require('../../controllers/admin/auth');


//  GET Routes


//  POST Routes
router.post("/admin/signup", postSignup);

router.post("/admin/signin",postSignin);

// router.post("/profile",requireSignin, (req,res)=>{
//     res.status(200).json({
//         user: "profile"
//     });
// });

//  Export router module
module.exports = router;