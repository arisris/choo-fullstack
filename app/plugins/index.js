module.exports = (state, emitter, app) => {

  if (!process.browser/* Run Only On Server */) {
    state.initialState = {
      holaaaalalalala: "Hiidsdsdsdsd"
    }
  }
  emitter.on("DOMContentLoaded", () => {
    if (!window.D) require("domq.js");
    
  });
}