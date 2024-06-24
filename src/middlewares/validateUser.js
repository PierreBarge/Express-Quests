const { body, validationResult } = require("express-validator");

const validateUser = [
  body("firstname").trim().notEmpty().isLength({ max: 255 }),
  body("lastname").trim().notEmpty().isLength({ max: 255 }),
  body("email").trim().notEmpty().isEmail().isLength({ max: 255 }),
  body("city").trim().notEmpty().isLength({ max: 255 }),
  body("language").trim().notEmpty().isLength({ max: 255 }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];

module.exports = validateUser;
