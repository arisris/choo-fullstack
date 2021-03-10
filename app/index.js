const choo = require("choo");
if (process.browser) require("./css/index.css");

const app = choo();
app.use(require("./plugins"));
app.route("/", require("./views/main"));
app.route("*", require("./views/errors"));
app.mount("body");
module.exports = app;
if (module.hot) {
  module.hot.accept(() => {
    app.emitter.emit("render");
  });
}
