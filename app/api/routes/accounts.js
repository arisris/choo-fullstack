const router = require("express").Router();
const createError = require("http-errors");
const { body } = require("express-validator");
const { throwIfNotValid } = require("../lib/validation");
const { asyncHandler, passwordVerify, jwtEncode } = require("../lib/utils");
const store = require("../store");
const jwtAuth = require("../middleware/auth-jwt");

router.get(
  "/me",
  jwtAuth,
  asyncHandler((req, res) => {
    res.json({ msg: "You Are Authenticated", user: req.user });
  })
);
router.post(
  "/login",
  asyncHandler(async function (req, res) {
    await throwIfNotValid(req, [
      body(["email", "password"], "Canot be Empty").notEmpty(),
      body("email", "Is Not Valid Email").isEmail(),
      body("password", "Min Length 6 Character").isLength({ min: 6 })
    ]);
    const {
      payload: {
        records: [user],
        include
      }
    } = await store.find("users", null, {
      match: {
        email: req.body.email
      },
      limit: 1
    });
    const fail = createError.Forbidden("Invalid email or password!!");
    if (!user) throw fail;
    if (!(await passwordVerify(req.body.password, user.password))) throw fail;
    const value = jwtEncode({
      id: user.id,
      name: user.name,
      email: user.email
    });
    res.json({ success: true, value });
  })
);
router.post(
  "/register",
  asyncHandler(async function (req, res) {
    await throwIfNotValid(req, [
      body(["name", "email", "password"], "Canot be Empty").notEmpty(),
      body("email", "Is Not Valid Email").isEmail(),
      body("password", "Min Length 6 Character").isLength({ min: 6 })
    ]);
    const {
      payload: { count: userCount }
    } = await store.find("users", null, {
      match: {
        email: req.body.email
      },
      limit: 1
    });
    if (userCount > 0) throw createError.Forbidden("Record Exists");
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    const {
      payload: { records }
    } = await store.create("users", data);
    if (records.length === 0) throw createError.InternalServerError();
    const [user] = records;
    const value = jwtEncode({
      id: user.id,
      name: user.name,
      email: user.email
    });
    res.json({ success: true, value });
  })
);

module.exports = router;
