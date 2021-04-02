#!/usr/bin/env node
const { program } = require("commander");
program
  .usage("node server --port <port> --host <host>")
  .option("-P, --port <port>", "Provide Host", 3000)
  .option("-H, --host <host>", "Provide Host", "localhost");
program.parse(process.argv);

const { port, host } = program.opts();

require("./app/index.server.js").listen(parseInt(port), host, () =>
  console.log(`App is now run at port http://${host}:${port}`)
);
