const html = require("choo/html");
const navItem = require("./navbar-item");

const menu = {active: false};
module.exports = function (state, emit) {
  return html`
    <div class="db bg-purple white shadow-1">
      <div class="flex flex-column flex-row-l justify-between-l mw8-l" style="margin:auto">
        <div class="flex justify-between items-center h2">
          <a href="/" class="db pl2 f4 white b i underline">KlikApp</a>
          <div class="pr2 dn-l"><a href="#" class="db pa1 ba white hover-bg-black-10 b--white-10 no-underline" onclick="${toggleMenu}">Menu</a></div>
        </div>
        <div class="${menu.active ? "flex" : "dn"} flex-l flex-column flex-row-l items-center-l mv1 mv0-l bt bn-l b--white-10 z-5 z-unset-l">
          ${navItem("/login", "Login")}
          ${navItem("/register", "Register")}
        </div>
      </div>
    </div>
  `
  function toggleMenu(e) {
    e.preventDefault();
    menu.active = !menu.active;
    emit(state.events.RENDER)
  }
}