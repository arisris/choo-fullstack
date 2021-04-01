const path = require("path");
const watcher = require("@parcel/watcher");

// Invalidate require cache on request
watcher.subscribe("./app", (err, event) => {
  Object.keys(require.cache).forEach(id => {
    if (id.startsWith(path.join(__dirname, "app"))) {
      delete require.cache[id];
    }
  });
});
module.exports = app => {
  app.use((req, res) => {
    // Lazy express like modules loaded here
    require("./app/index.server.js")(req, res);
  });
};
