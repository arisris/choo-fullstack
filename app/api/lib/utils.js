const bcrypt = require("bcrypt");
const jwtSimple = require("jwt-simple");
const SALT_ROUNDS = 10;
const twoday = 1000 * 3600 * 24 * 2;
const JWT_SECRET = process.env.JWT_SECRET || "78612312hckschsdhsisdhf";
const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789-abcdefghijklmnopqrstuvwxyz";

exports.getUrlFromRequest = req => url.format({ protocol: req.protocol });
exports.passwordHash = text => bcrypt.hash(text, SALT_ROUNDS);
exports.passwordVerify = (text, password) => bcrypt.compare(text, password);
exports.asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
exports.randomString = c => {
  const arr = [];
  for (let i = 0; i < (parseInt(c) || 15); i++) {
    arr.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }
  return arr.join("");
};
exports.jwtEncode = payload => {
  const now = Date.now();
  const obj = {
    iat: now,
    exp: now + twoday // after 2 days
  };
  return jwtSimple.encode(Object.assign(obj, payload), JWT_SECRET);
};
exports.jwtDecode = encoded => jwtSimple.decode(encoded, JWT_SECRET);