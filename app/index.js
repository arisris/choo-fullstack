const choo = require("choo");
if (process.browser) require("./css/index.css");

const app = choo();
app.use(require("./plugins/auth"));
app.route("/", require("./views/main"));
app.route("/login", require("./views/auth/login"));
app.route("/forgot-password", require("./views/auth/forgot-password"));
app.route("/register", require("./views/auth/register"));
app.route("*", require("./views/404"));
app.mount("body");
module.exports = app;
if (module.hot) {
  module.hot.accept();
}
