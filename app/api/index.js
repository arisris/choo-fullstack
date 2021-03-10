const express = require("express");
const router = express.Router();

router.use(require("./middleware/start"));

router.get("/", function (req, res) {
  res.json({ msg: "hello api" });
});
router.get("/dump", function (req, res) {
  res.dump("store");
});

router.use(require("./middleware/end"));

module.exports = router;
