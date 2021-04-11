const createError = require("http-errors");
const { asyncHandler, jwtDecode } = require("../lib/utils");

module.exports = asyncHandler(async function (req, res, next) {
  let token = undefined;
  if (req.headers.authorization) {
    token = req.headers.authorization.split("Bearer ")[1];
  } else if (req.query.access_token) {
    token = req.query.access_token;
  }
  if (!token) throw createError(401);
  try {
    const user = jwtDecode(token);
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email
    };
    return next();
  } catch (e) {
    throw createError(401, e.message);
  }
});
