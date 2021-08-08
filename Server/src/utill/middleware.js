// ! Import Dependencies
const jwt = require('jsonwebtoken');
const express = require("express");
const multer = require("multer");
const shortid = require("shortid");
const path = require('path');

// ! This middleware handles jwt token and return token in user body
exports.requireSignin = (req, res, next) => {
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = user;
    }else{
        res.status(400).json({message: "Authorization Required"});
    }
    next();
};

// ! This middleware check if client is user or not
exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== "user")
    return res.status(400).json({ message: "User Access Denied" });
  next();
};

// ! This middleware check id client is admin or not
exports.adminMiddleware = (req, res,next) => {
  if (req.user.role !== "admin")
    {return res.status(400).json({ message: "Admin Access Denied" });}
  next();
};



//  ! Use Dependencies
//  Set Router Module
const router = express.Router();

//  For file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
exports.upload = multer({ storage: storage });