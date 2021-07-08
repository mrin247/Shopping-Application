const { validationResult, check } = require("express-validator");

exports.validateSignupReq = [
  check("firstName").notEmpty().withMessage("First Name is required"),
  check("lastName").notEmpty().withMessage("Last Name is reuired"),
  check("email").isEmail().withMessage("Valid Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("must be at least 6 chars long")
    .matches(/\d/)
    .withMessage("must contain a number"),
];

exports.validateSigninReq = [
    check("email").isEmail().withMessage("Valid Email is required"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("must be at least 6 chars long")
      .matches(/\d/)
      .withMessage("must contain a number"),
  ];

exports.isValidatedReq = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  next();
};
