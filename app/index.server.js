const express = require("express");
const path = require("path");
const url = require("url");
const htmldom = require("htmldom");
const index = require("./");
const app = express();

app.use("/api", require("./api"));
app.use((req, res, next) => {
  const serverState = {
    hello: "World"
  };
  const state = { serverState };
  try {
    let raw = index.toString(req.url, state);
    raw = htmldom(raw);
    if (state.route === "*") res.status(404);
    res.send(raw.beautify());
  } catch (e) {
    next(e);
  }
});

module.exports = app;
