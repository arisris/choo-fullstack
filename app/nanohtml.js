var notransform = function (babel) {
  return {};
};
module.exports = process.env.NANOHTML ? require("nanohtml") : notransform;
