const html = require("choo/html");
const raw = require("choo/html/raw");

const browser = view => (state, emit) => {
  return html`
    <body>
      ${view(state, emit)}
    </body>
  `;
};
const server = view => (state, emit) => {
  const initialState = state.initialState || {};
  const serverState = state.serverState || {};

  Object.assign(state, {
    initialState: Object.assign(initialState, serverState)
  });

  // purging initialState
  delete state.initialState;
  const render = view(state, emit);

  return html` <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
        />
        <title>${state.title || ""}</title>
        <link rel="stylesheet" href="/parcel/index.css" />
      </head>
      <body>
        ${render}
        <script>
          window.initialState = ${raw(JSON.stringify(initialState))};
        </script>
        <script src="/parcel/index.js"></script>
      </body>
    </html>`;
};

module.exports = process.browser ? browser : server;
