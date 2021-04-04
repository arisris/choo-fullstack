const { body, validationResult } = require("express-validator");
const { throwIfNotValid } = require("../lib/validation");
const { asyncHandler } = require("../lib/utils");

const store = require("../store");

exports.login = asyncHandler(async (req, res, next) => {
  const { payload } = await store.find("users");
  res.json(payload)
});

exports.register = asyncHandler(async (req, res, next) => {
  await throwIfNotValid(req, [
    body("name").not().isEmpty(),
    body("email", "Is Not Mail").isEmail(),
    body(
      "password",
      "Password Length Is Invalid Min 6, Max 32 character"
    ).isLength({ min: 6, max: 32 })
  ]);
  const {
    payload: { count, record }
  } = await store.create("users", {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  res.json(record);
});
exports.resetPassword = async (req, res, next) => {
  next();
};

exports.resetPasswordVerify = async (req, res, next) => {
  next();
};
