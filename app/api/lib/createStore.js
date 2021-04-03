const path = require("path");
const fortune = require("fortune");
const fsAdapter = require("fortune-fs");

module.exports = models => {
  const noOninput = (contex, record, update) =>
    contex.request.method === "delete" ? null : update;
  const noOnOutput = (contex, update) => update;
  const mappedMethods = {};
  /*const [hooks, types] = models.reduce((reducer, currentValue, currentIndex) => {
    reducer[0] = {};
    reducer[1] = {};
    if (
      typeof currentValue.name === "string" &&
      typeof currentValue.types === "object"
    ) {
      mappedMethods[currentValue.name] = {};
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
  }, []);*/
  const { hooks, types } = models.reduce(
    (reducer, currentValue, currentIndex) => {
      if (
        typeof currentValue.name === "string" &&
        typeof currentValue.types === "object"
      ) {
        mappedMethods[currentValue.name] = {};
        reducer.hooks[currentValue.name] = [
          typeof currentValue.onInput === "function"
            ? currentValue.onInput
            : noOninput,
          typeof currentValue.onOutput === "function"
            ? currentValue.onOutput
            : noOnOutput
        ];
        reducer.types[currentValue.name] = currentValue.types;
      }
      return reducer;
    },
    { hooks: {}, types: {} }
  );
  const store = fortune(types, {
    hooks,
    adapter: [fsAdapter, { path: path.join(process.cwd(), "storage/store") }]
  });
  const mapped = Object.keys(mappedMethods).reduce((a, b) => {
    a[b] = {
      find: (...args) => store.find.apply(store, [b, ...args]),
      create: (...args) => store.create.apply(store, [b, ...args]),
      update: (...args) => store.update.apply(store, [b, ...args]),
      remove: (...args) => store.remove.apply(store, [b, ...args])
    };
    return a;
  }, {});
  Object.assign(store, {
    model: Object.seal(mapped)
  });
  return store;
};
