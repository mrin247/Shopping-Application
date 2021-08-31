// ! Import Dependencies
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortId = require("shortid");

// ! Import Models
const User = require("../../models/user");

// ! This controller handles signup request from "admin/signup" route
exports.postSignup = (req, res, next) => {
  //  Check if user email id is already registered or not
  User.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (user)
      return res.status(400).json({
        message: "Admin is already registered",
      });

    // Destructure input from req body
    const { firstName, lastName, email, password } = req.body;

    // Hash password
    const hash_password = await bcrypt.hash(password, 10);

    // Create new user from Destructured body parameters
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      userName: shortId.generate(),
      role: "admin",
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
          message: "Admin user created successfully",
        });
      }
    });
  });
};

// ! This controller handles signin request from "admin/signin" route
exports.postSignin = (req, res, next) => {
  User.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (err) return res.status(400).json({ err });
    if (user) {
      const isPassword=await user.authenticate(req.body.password);
      if (isPassword && user.role === "admin") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_TOKEN,
          { expiresIn: "2d" }
        );
        res.cookie("token", token, { expiresIn: "2d" });
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

// ! This controller handles signout request from "admin/signout" route
exports.postSignout = (req, res, next) => {
  res.clearCookie("token"); // Clear cookie
  res.status(200).json({
    message: "Signout successfully",
  });
};
