const store = require("../store");

exports.login = async (req, res, next) => {
  res.dump("Hiii");
};

exports.register = async (req, res, next) => {
  next();
};

exports.resetPassword = async (req, res, next) => {
  next();
};

exports.resetPasswordVerify = async (req, res, next) => {
  next();
};
