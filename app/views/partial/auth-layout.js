const html = require("choo/html");
const body = require("./body");
const footer = require("./footer");

module.exports = view => body((state, emit) => {
  emit(state.events.DOMTITLECHANGE, "Authentication");
  const render = view(state, emit);
  return html`
    <div class="absolute flex flex-column justify-between items-center w-100 h-100">
      <div></div>
      <div class="flex justify-center items-center flex-column">
        <div class="flex items-center justify-center pa2 bt br bl b--black-10 w5 b">
          ${state.title}
        </div>
        ${render}
      </div>
      <div class="w-100">
        ${footer(state, emit)}
      </div>
    </div>
  `
});