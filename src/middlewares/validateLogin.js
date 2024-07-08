const { body, validationResult } = require("express-validator");

const validateLogin = [
  body("email").trim().notEmpty().isEmail().isLength({ max: 255 }),
  body("password").trim().notEmpty().isString().isLength({ max: 50 }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];

module.exports = validateLogin;
