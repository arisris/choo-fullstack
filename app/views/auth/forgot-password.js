const html = require("choo/html");
const layout = require("../partial/auth-layout");

module.exports = layout((state, emit) => {
  emit(state.events.DOMTITLECHANGE, "Forgot Password");
  return html`
    <div class="flex justify-center items-center ma0 pa4 purple ba b--black-10">
      <form method="POST" action="/forgot-password">
        <div class="mv2">
          <label class="db">Email:</label>
          <input type="email" name="email" class="pa1" value="" placeholder="Insert Your Email" required>
        </div>
        <div class="mv2 flex justify-end">
          <button type="submit" class="">Submit</button>
        </div>
        <div class="mt2">
          <a href="/login">Login</a>
          <br />
          <a href="/register">Register</a>
        </div>
      </form>
    </div>
  `
});