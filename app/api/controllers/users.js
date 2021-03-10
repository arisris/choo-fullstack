const store = require("../store");
const { body } = require("express-validator");

exports.create = [
  body("name").not().isEmpty().isString(),
  body("email").isEmail().bail(),
  body("password").isString().isLength({ min: 6 }),
  function (req, res, next) {}
];
exports.find = [];
exports.update = [];
exports.remove = [];
