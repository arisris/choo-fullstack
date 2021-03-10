const html = require("choo/html");
const body = require("./body");

module.exports = view => body((state, emit) => {
  return html`
    <div class="absolute flex flex-column w-100 h-100">
      <div class="flex justify-between h2 bg-purple white">
        
      </div>
      <div class="flex-auto">${view(state, emit)}</div>
      <div class="center">This Foot</div>
    </div>
  `
});