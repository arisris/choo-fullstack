const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const store = require("./store");
const { asyncHandler } = require("./lib/utils");
const { passwordHash, passwordVerify } = require("./lib/utils");
router.use(require("./middleware/start"));
router.use("/accounts", require("./routes/accounts"));
router.get("/", async function (req, res) {
  res.json({ msg: "hello worldssssseeee" });
});
router.use(require("./middleware/end"));

module.exports = router;
