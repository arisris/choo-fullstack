const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");
const watcher = require("@parcel/watcher");
const child_process = require("child_process");

const port = 3479;
let server = spawnServer();
watcher.subscribe("./app", (err, event) => {
  console.log(`Changes Detected. Kill The Server`);
  server.kill();
});

// Handle Parcel Exit
process.on("exit", () => {
  process.stdout.write("Exited Dev Server Byeee...\n");
  server.kill();
});
let prevlength = 0;
function spawnServer() {
  const cp = child_process.spawn("node", ["cli", "serve", "--port", port]);
  cp.stdout.on("data", data => {
    process.stdout.write(`Log: ${data}`);
  });

  cp.stderr.on("data", data => {
    // fix for infinity loop same error buffer
    if (data.length !== prevlength) { // compared with previous buff length
      process.stderr.write(`Err: ${data}`);
      prevlength = data.length;
    }
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
