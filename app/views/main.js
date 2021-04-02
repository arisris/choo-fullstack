const html = require("choo/html");
const layout = require("./partial/layout");

module.exports = layout((state, emit) => {
  emit(state.events.DOMTITLECHANGE, "KlikApp");
  return html`<h3>Hello wweewcxcxcwwwsss</h3>`;
});
