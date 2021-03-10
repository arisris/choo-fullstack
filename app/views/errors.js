const html = require("choo/html");
const body = require("./partial/body");

module.exports = body((state, emit) => {
  return html`
    <div class="absolute flex flex-column w-100 h-100 items-center justify-center avenir">
      <h3 class="flex items-center ma0 pa4 shadow-4 black-70">
        <span class="f1 pr2">404</span>
        <span class="f4 bl pl2 pv3 b-black-10">Page Not Found</span>
      </h3>
    </div>
  `
});