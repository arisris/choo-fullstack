const path = require("path");
const chokidar = require("chokidar");
const express = require("express");
const app = express();

const watcher = chokidar.watch(["./app"]);
watcher.on("ready", () => {
  watcher.on("all", () => {
    Object.keys(require.cache).forEach(id => {
      if (id.startsWith(path.join(__dirname, "app"))) {
        delete require.cache[id];
      }
    });
  });
});
module.exports = devserver => {
  app.use(express.static(path.join(__dirname, "public")));
  app.use((req, res, next) => {
    require("./app/index.server.js")(req, res, next);
  });
  devserver.use(app);
};
