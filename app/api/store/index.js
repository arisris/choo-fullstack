const createStore = require("../lib/createStore");

module.exports = createStore([
  require("./users"),
  require("./posts")
]);