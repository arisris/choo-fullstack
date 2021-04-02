const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const auth = require("./controllers/auth");
const store = require("./store");
const { passwordHash, passwordVerify } = require("./lib/utils");

router.use(require("./middleware/start"));

router.post("/auth/login", auth.login);
router.post("/auth/register", auth.register);
router.post("/auth/reset-password", auth.resetPassword);
router.post("/auth/reset-password-verify", auth.resetPasswordVerify);

router.get("/", async function (req, res) {
  res.json({ msg: "hello" });
});
router.get("/dump", async function (req, res, next) {
  //process.exit();
  res.dump("zzzzxxxxxxxxxx");
});

router.use(require("./middleware/end"));

module.exports = router;
