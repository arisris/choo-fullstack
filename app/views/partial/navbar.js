const html = require("choo/html");

const menu = {active: false};
module.exports = (state, emit) => {
  return html`
    <div class="db bg-purple white shadow-1">
      <div class="flex flex-column flex-row-l justify-between-l mw8-l" style="margin:auto">
        <div class="flex justify-between items-center h2">
          <a href="/" class="db pl2 f4 white b i underline">KlikApp</a>
          <div class="pr2 dn-l"><a href="#" class="db pa1 ba white hover-bg-black-10 b--white-10 no-underline" onclick="${toggleMenu}">Menu</a></div>
        </div>
        <div class="${menu.active ? "flex" : "dn"} flex-l flex-column flex-row-l items-center-l mv1 mv0-l bt bn-l b--white-10 z-5 z-unset-l">
          ${/*[0,1,2,3].map(i => html`
            <div class="db mh2-l">
              <a href="#menu${i}" class="f6 f5-l db pa1 link white hover-bg-black-10 no-underline">Menu ${i}</a>
            </div>
          `)*/''}
          <div class="db mh2-l">
            <a href="/login" class="f6 f5-l db pa1 link white hover-bg-black-10 no-underline">Login</a>
          </div>
          <div class="db mh2-l">
            <a href="/register" class="f6 f5-l db pa1 link white hover-bg-black-10 no-underline">Register</a>
          </div>
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