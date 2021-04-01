const html = require("choo/html");
const raw = require("choo/html/raw");

module.exports = (state, emit) => {
  return html`
    <div class="block pa2 bt b--black-10">
      <div class="flex justify-center items-center pt2">
        ${raw("&copy; "+new Date().getFullYear())} Kliksob Network
      </div>
    </div>
  `
}