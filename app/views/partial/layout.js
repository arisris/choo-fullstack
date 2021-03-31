const html = require("choo/html");
const raw = require("choo/html/raw");
const body = require("./body");
const navbar = require("./navbar");

module.exports = view => body((state, emit) => {
  return html`
    <div class="absolute flex flex-column w-100 h-100">
      ${navbar(state, emit)}
      <div class="flex-auto">
        <div class="mw8-l" style="margin:auto">
          ${view(state, emit)}
        </div>
      </div>
      <div class="block pa2 bt b--black-10">
        <div class="flex justify-center items-center pt2">
          ${raw("&copy; "+new Date().getFullYear())} Kliksob Network
        </div>
      </div>
    </div>
  `
});