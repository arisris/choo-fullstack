const html = require("choo/html");
const layout = require("../partial/auth-layout");
const isEmail = require("validator/lib/isEmail");
const isLength = require("validator/lib/isLength");

const values = {
  email: "",
  password: "",
  remember: false
};
const allDone = {
  email: false,
  password: false
};
module.exports = layout((state, emit) => {
  emit(state.events.DOMTITLECHANGE, "Login");
  state.auth.forms.login = values;
  const action = "/api/accounts/login";
  return html`
    <div
      class="flex flex-column justify-center items-center ma0 pa4 purple ba b--black-10"
    >
      <form method="POST" action=${action}>
        <div class="mv2">
          <label class="db"
            >Email: <span title="Required valid email address">*</span></label
          >
          <input
            type="email"
            name="email"
            class="pa1 ${isValidClass(values.email, v => {
              let i = isEmail(v);
              allDone.email = i;
              return i;
            })} outline-0"
            value=${values.email}
            oninput=${onChange}
            placeholder="Insert Your Email"
            required
          />
        </div>
        <div class="mv2">
          <label class="db"
            >Password:
            <span title="Required min-len 6 character">*</span></label
          >
          <input
            type="password"
            name="password"
            class="pa1 ${isValidClass(values.password, v => {
              let i = isLength(v, { min: 6 });
              allDone.password = i;
              return i;
            })} outline-0"
            value=${values.password}
            oninput=${onChange}
            placeholder="Insert Your Password"
            required
          />
        </div>
        <div class="mv2 flex justify-between">
          <label class="flex items-center pointer">
            <input
              type="checkbox"
              name="remember"
              oninput=${onChange}
              ${values.remember ? "checked" : ""}
            />
            <span class="f6 ml1">Remember Me</span>
          </label>
          <button
            type="submit"
            onclick=${submit}
            ${allDone.email && allDone.password ? "" : "disabled"}
          >
            Submit
          </button>
        </div>
        <div class="mt2">
          <a href="/forgot-password">Forgot Password</a>
          <br />
          <a href="/register">Register</a>
        </div>
      </form>
    </div>
  `;
  function isValidClass(v, cb) {
    return v.length > 0 ? (cb(v) ? "ba bw1 b--green" : "ba bw1 b--red") : "";
  }
  function onChange(e) {
    e.preventDefault();
    const el = e.currentTarget;
    if (el.type === "checkbox") {
      values[el.name] = el.checked;
    } else {
      values[el.name] = el.value;
    }
    emit("render");
  }
  function submit(e) {
    e.preventDefault();
    emit("auth:login", action);
  }
});
