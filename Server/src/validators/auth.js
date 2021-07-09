// ! Import express-validator for validation
const { validationResult, check } = require("express-validator");

// ! This middleware validate signup requests
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

// ! This middleware validate signin requests
exports.validateSigninReq = [
    check("email").isEmail().withMessage("Valid Email is required"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("must be at least 6 chars long")
      .matches(/\d/)
      .withMessage("must contain a number"),
  ];

// ! This middleware verify validation and return errors
exports.isValidatedReq = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  next();
};
