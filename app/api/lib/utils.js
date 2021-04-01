const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

exports.getUrlFromRequest = req => url.format({ protocol: req.protocol });

exports.passwordHash = text => bcrypt.hash(text, SALT_ROUNDS);
exports.passwordVerify = (text, password) => bcrypt.compare(text, password);