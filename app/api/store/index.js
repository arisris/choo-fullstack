const createStore = require("../lib/createStore");

const DEFINED_MODEL = [
  require("./users"),
  require("./posts")
];

const store = createStore(DEFINED_MODEL);

module.exports = store;