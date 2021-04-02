const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");
const watcher = require("@parcel/watcher");
const child_process = require("child_process");

let program = newProgram();
watcher.subscribe("./app", (err, event) => {
  console.log(`Changes Detected. Kill The Server`);
  program.kill();
});

// Handle Parcel Exit
process.on("exit", () => {
  console.log("Exited Byeee");
  program.kill();
});

function newProgram() {
  const cp = child_process.spawn("node", ["server", "--port", 9000]);
  cp.stdout.on("data", data => {
    console.log(`Log: ${data}`);
  });
  cp.stderr.on("data", data => {
    console.error(`Err: ${data}`);
  });
  cp.on("close", code => {
    program = newProgram();
  });
  return cp;
}

module.exports = app => {
  app.use(
    createProxyMiddleware({
      target: "http://localhost:9000",
      changeOrigin: true
    })
  );
};
