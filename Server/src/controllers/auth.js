// ! Import Models
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// ! This controller handles signup request from "/signup" route
exports.postSignup = (req, res, next) => {
  //  Check if user email id is already registered or not
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user)
      return res.status(400).json({
        message: "User is already registered",
      });
    // Destructure input from req body
    const { firstName, lastName, email, password } = req.body;

    // Create new user from Destructured body parameters
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      userName: Math.random().toString(),
    });

    // Save User to DB
    _user.save((err, data) => {
      if (err)
        return res.status(400).json({
          err: err,
          message: "Something went wrong",
        });

      if (data) {
        return res.status(201).json({
          message: "user created successfully",
        });
      }
    });
  });
};

// ! This controller handles signin request from "/signin" route
exports.postSignin = (req, res, next) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) return res.status(400).json({ err });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_TOKEN,
          {
            expiresIn: "1d",
          }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        res.status(400).json({
          message: "Invalid password",
        });
      }
    } else {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  });
};
