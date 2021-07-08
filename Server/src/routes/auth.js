const express = require('express');
//  Set Router Module
const router = express.Router();

// Import models
const {postSignin, postSignup, requireSignin } = require('../controllers/auth');


//  GET Routes


//  POST Routes
router.post("/signup", postSignup);

router.post("/signin",postSignin);

router.post("/profile",requireSignin, (req,res)=>{
    res.status(200).json({
        user: "profile"
    });
});

//  Export router module
module.exports = router;