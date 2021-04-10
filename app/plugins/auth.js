let user = null;
const auth = {
  forms: {}
};

module.exports = function (state, emitter) {
  state.user = user;
  state.auth = auth;
  emitter.on("auth:login", function (data) {
    console.log(state.auth);
  });
  emitter.on("auth:register", function (data) {
    console.log(data);
  });
};
