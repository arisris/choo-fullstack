const createStore = require("../lib/createStore");

const DEFINED_MODEL = [
  require("./users")
];

module.exports = createStore(DEFINED_MODEL);