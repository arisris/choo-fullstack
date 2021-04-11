const gs = require("good-storage/dist/storage");
const axios = require("axios");
let user = undefined;
const auth = {
  forms: {},
  isLoading: false,
  error: false
};

module.exports = function (state, emitter) {
  state.user = gs.get("app.auth", undefined);
  state.auth = auth;
  emitter.on("auth:login", function (action) {
    state.auth.isLoading = true;
    axios
      .post(action, state.auth.forms.login)
      .then(({ data }) => {
         state.auth.isLoading = false;
        if (data.success) {
          gs.set("app.auth", data.value);
          emitter.emit(state.events.PUSHSTATE, "/")
        }
      })
      .catch(({ response: { data } }) => {
        state.auth.error = data;
        emitter.emit("render");
        state.auth.isLoading = false;
        let tid = setTimeout(() => {
          state.auth.error = false;
          emitter.emit("render");
          clearTimeout(tid);
        }, 5000);
      });
  });
  emitter.on("auth:register", function (data) {
    console.log(data);
  });
};
