const html = require("choo/html");

module.exports = (url = "#", text = "", onclick = function() {}) => {
  return html`
    <div class="db mh1-l">
      <a href="${url}" onclick=${onclick} class="ph2 f6 f5-l db pa1 link white hover-bg-black-10 no-underline">${text}</a>
    </div>
  `
}