const path = require("path");
const fortune = require("fortune");
const fsAdapter = require("fortune-fs");
const Emittery = require("emittery");
const isFunction = v => typeof v === "function";

const onInput = model => (context, record, update) => {
  Object.assign(model, { context });
  switch (context.request.method) {
    case "create":
      if (model.timestamp === true) {
        record.created_at = new Date();
        record.updated_at = new Date();
      }
      return model.emitSerial("create", record);
    case "update":
      if (model.timestamp === true) {
        update.updated_at = new Date();
      }
      return model.emitSerial("update", update);
    case "delete":
      return model.emitSerial("delete");
  }
};
const onOutput = model => (context, record) => {
  Object.assign(model, { context });
  return model.emitSerial("output", record);
};

module.exports = models => {
  const initializer = [];
  const { hooks, fields } = models
    .filter(model => model && typeof model === "function")
    .map(model => {
      Emittery.mixin("emittery")(model);
      return new model();
    })
    .reduce(
      (reducer, model) => {
        if (
          typeof model.name === "string" &&
          typeof model.fields === "object"
        ) {
          reducer.hooks[model.name] = [onInput(model), onOutput(model)];
          if (model.timestamp === true) {
            Object.assign(model.fields, {
              created_at: Date,
              updated_at: Date
            });
          } else {
            model.timestamp = false;
          }
          reducer.fields[model.name] = model.fields;
          initializer.push(model);
        }
        return reducer;
      },
      { hooks: {}, fields: {} }
    );
  const store = fortune(fields, {
    hooks,
    adapter: [fsAdapter, { path: path.join(process.cwd(), "storage/store") }]
  });
  initializer.map(model => {
    Object.assign(model, { store });
    model.emit("init", store);
    return model;
  });
  return store;
};
