module.exports = (state, emitter, app) => {
  if (!process.browser /* Run Only On Server */) {
    state.initialState = {
      holaaaalalalala: "Hiidsdsdsdsd"
    };
  }
  if (process.browser) require("domq.js");
  emitter.on("DOMContentLoaded", () => {});
};
