const { body, validationResult } = require("express-validator");

const validateMovie = [
  body("title").trim().notEmpty().isLength({ max: 255 }),
  body("director").trim().notEmpty().isLength({ max: 255 }),
  body("year").trim().notEmpty().isLength({ max: 255 }),
  body("color").trim().notEmpty().isLength({ max: 255 }),
  body("duration").trim().notEmpty(),

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
