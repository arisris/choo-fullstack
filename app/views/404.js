const html = require("choo/html");
const body = require("./partial/body");

module.exports = body((state, emit) => {
  return html`
    <div class="absolute flex flex-column w-100 h-100 items-center justify-center">
      <h3 class="flex items-center ma0 pa3 black-70 purple">
        <span class="f1 pr2">404</span>
        <span class="f4 bl bw1 pl2 pv3 b-black-10">Page Not Found</span>
      </h3>
      <p>
        <a href="/" class="link">Back To Home</a>
      </p>
    </div>
  `
});