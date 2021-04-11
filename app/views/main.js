const html = require("choo/html");
const layout = require("./partial/layout");

module.exports = layout((state, emit) => {
  let user = state.user;
  emit(state.events.DOMTITLECHANGE, "KlikApp");
  return html`
    <h3>Hello World</h3>
    <div>
      <h4>Auth State: <span class="${user ? "green" : "red"}">${user ? "Authenticated": "Unauthenticated"}</span></h4>
      ${user
        ? Object.keys(user).filter(i => i!=="access_token").map(i => html`<p>${i} : ${user[i]}</p>`)
        : ""
      }
    </div>
  `;
});
