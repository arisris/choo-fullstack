const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");
const watcher = require("@parcel/watcher");
const child_process = require("child_process");

let server = spawnServer();
let port = 3479;
watcher.subscribe("./app", (err, event) => {
  console.log(`Changes Detected. Kill The Server`);
  server.kill();
});

// Handle Parcel Exit
process.on("exit", () => {
  console.log("Exited Byeee");
  server.kill();
});

function spawnServer() {
  const cp = child_process.spawn("node", ["server", "--port", port]);
  cp.stdout.on("data", data => {
    console.log(`Log: ${data}`);
  });
  cp.stderr.on("data", data => {
    console.error(`Err: ${data}`);
  });
  cp.on("close", code => {
    server = spawnServer();
  });
  return cp;
}

module.exports = app => {
  app.use(
    createProxyMiddleware({
      target: "http://localhost:" + port,
      changeOrigin: true
    })
  );
};
