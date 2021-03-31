const html = require("choo/html");
const body = require("./body");

module.exports = view => body((state, emit) => {
  emit(state.events.DOMTITLECHANGE, "Authentication");
  const render = view(state, emit);
  return html`
    <div class="absolute flex flex-column justify-center items-center w-100 h-100">
      <div class="flex justify-center pa2 ba b--black-10 w5 b">${state.title}</div>
      ${render}
    </div>
  `
});