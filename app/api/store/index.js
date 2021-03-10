const path = require("path");
const fortune = require("fortune");
const fsAdapter = require("fortune-fs");
const models = require("./models");

const noOninput = (contex, record, update) =>
  contex.request.method === "delete" ? null : update;
const noOnOutput = (contex, update) => update;
const [hooks, types] = models.reduce((reducer, currentValue) => {
  reducer[0] = {};
  reducer[1] = {};
  if (
    typeof currentValue.name === "string" &&
    typeof currentValue.types === "object"
  ) {
    reducer[0][currentValue.name] = [
      typeof currentValue.onInput === "function"
        ? currentValue.onInput
        : noOninput,
      typeof currentValue.onOutput === "function"
        ? currentValue.onOutput
        : noOnOutput
    ];
    reducer[1][currentValue.name] = currentValue.types;
  }
  return reducer;
}, []);

const store = fortune(types, {
  hooks,
  adapter: [fsAdapter, { path: path.join(process.cwd(), "storage/store") }]
});
console.log(store);

module.exports = store;
