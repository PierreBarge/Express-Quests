const { body, validationResult } = require("express-validator");

const validateMovie = [
  body("title").trim().notEmpty().isString().isLength({ max: 255 }),
  body("director").trim().notEmpty().isString().isLength({ max: 255 }),
  body("year").trim().notEmpty().isString().isLength({ max: 255 }),
  body("color").trim().notEmpty().isString().isLength({ max: 255 }),
  body("duration").trim().isInt().notEmpty(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];

module.exports = validateMovie;
