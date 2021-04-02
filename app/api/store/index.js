const createStore = require("../lib/createStore");

const DEFINED_MODEL = [
  require("./users")
];

const store = createStore(DEFINED_MODEL);

module.exports = store;