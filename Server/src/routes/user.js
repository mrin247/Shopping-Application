const express = require('express');
//  Set Router Module
const router = express.Router();

// Import models
const userController = require('../controllers/user');


//  GET Routes
router.post("/signin",(req,res,next)=>{

});

//  POST Routes
router.post("/signup", userController.postSignup);

//  Export router module
module.exports = router;