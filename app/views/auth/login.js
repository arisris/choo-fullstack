const html = require("choo/html");
const layout = require("../partial/auth-layout");

module.exports = layout((state, emit) => {
  emit(state.events.DOMTITLECHANGE, "Login");
  return html`
    <div class="flex justify-center items-center ma0 pa4 purple ba b--black-10">
      <form method="POST" action="/login">
        <div class="mv2">
          <label class="db">Email:</label>
          <input type="email" name="email" class="pa1" value="" placeholder="Insert Your Email" required>
        </div>
        <div class="mv2">
          <label class="db">Password:</label>
          <input type="password" name="password" class="pa1" value="" placeholder="Insert Your Password" required>
        </div>
        <div class="mv2 flex justify-between">
          <label class="flex items-center pointer">
            <input type="checkbox" name="remember">
            <span class="f6 ml1">Remember Me</span>
          </label>
          <button type="submit" class="">Submit</button>
        </div>
        <div class="mt2">
          <a href="/forgot-password">Forgot Password</a>
          <br />
          <a href="/register">Register</a>
        </div>
      </form>
    </div>
  `
});