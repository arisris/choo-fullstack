const html = require("choo/html");
const raw = require("choo/html/raw");
const body = require("./body");
const header = require("./header");
const footer = require("./footer");

module.exports = view => body((state, emit) => {
  return html`
    <div class="absolute flex flex-column w-100 h-100">
      ${header(state, emit)}
      <div class="flex-auto">
        <div class="mw8-l pa2" style="margin:auto">
          ${view(state, emit)}
        </div>
      </div>
      ${footer(state, emit)}
    </div>
  `
});