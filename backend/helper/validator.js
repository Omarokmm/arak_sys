const { check } = require("express-validator");
exports.registerValidator = [
  check("firstName", "firstName is Required").not().isEmpty(),
  check("lastName", "lastName is Required").not().isEmpty(),
  check("email", "Please include valid email").isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
  check("password", "Password is Required").not().isEmpty(),
  check("confirmPassword", "confirmPassword is Required").not().isEmpty(),
];
exports.loginValidator = [
  check("email", "Please include valid email").isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
  check("password", "Password is Required").not().isEmpty(),
];