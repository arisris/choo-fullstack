const html = require("choo/html");
const layout = require("../partial/auth-layout");

module.exports = layout((state, emit) => {
  emit(state.events.DOMTITLECHANGE, "Register");
  return html`
    <div class="flex justify-center items-center ma0 pa4 purple ba b--black-10">
      <form method="POST" action="/register">
        <div class="mv2">
          <label class="db">Full Name:</label>
          <input type="text" name="name" class="pa1" value="" placeholder="Insert Your name" required>
        </div>
        <div class="mv2">
          <label class="db">Email:</label>
          <input type="email" name="email" class="pa1" value="" placeholder="Insert Your Email" required>
        </div>
        <div class="mv2">
          <label class="db">Password:</label>
          <input type="password" name="password" class="pa1" value="" placeholder="Insert Your Password" required>
        </div>
        <div class="mv2">
          <label class="db">Confirm Password:</label>
          <input type="password" name="password_confirm" class="pa1" value="" placeholder="Retype Your Password" required>
        </div>
        <div class="mv2 flex justify-end">
          <button type="submit" class="">Submit</button>
        </div>
        <div class="mt2">
          <a href="/forgot-password">Forgot Password</a>
          <br />
          <a href="/login">Login</a>
        </div>
      </form>
    </div>
  `
});