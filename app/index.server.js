const express = require("express");
const path = require("path");
const url = require("url");
const htmldom = require("htmldom");
const index = require("./");
const app = express();

app.use(express.static(path.join(__dirname, "/../public")));
app.use("/api", require("./api"));
app.use((req, res, next) => {
  const serverState = {
    hello: "wwwwssssssqqqqqqqq"
  };
  const state = { serverState };
  try {
    let raw = index.toString(req.url, state);
    raw = htmldom(raw);
    if (state.route === "*") res.status(404);
    res.send(
      process.env.NODE_ENV !== "production"
        ? raw.beautify()
        : raw.uglify()
    );
  } catch (e) {
    next(e);
  }
});

module.exports = app;
