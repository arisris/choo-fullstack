const path = require("path");
const fsj = require("fs-jetpack");
const express = require("express");
const chokidar = require("chokidar");
const Bundler = require("parcel-bundler");

const outDir = path.join(__dirname, "public/parcel");
const appDir = path.join(__dirname, "app");
process.env.BROWSERSLIST_IGNORE_OLD_DATA = true;
const bundler = new Bundler(path.join(appDir, "index.js"), {
  sourceMaps: false,
  autoInstall: false,
  outDir: outDir,
  publicUrl: "/parcel",
  scopeHoist: process.env.NODE_ENV === "production"
});
const app = express();
app.use(express.static(path.join(__dirname, "public")));

async function run() {
  await fsj.removeAsync(outDir);
  app.use(function (req, res, next) {
    require(path.join(appDir, "index.server"))(req, res, next);
  });
  let isFistRun = true;
  bundler.on("buildEnd", function (bundle) {
    if (!isFistRun) return;
    app.listen(3000, function () {
      console.log(`> Http Server Is Now Run At Port 3000`);
      isFistRun = false;
    });
    if (process.env.NODE_ENV !== "production") runWatcher();
  });
  await bundler.bundle();
}

function runWatcher() {
  const reload = function () {
    for (let id in require.cache) {
      if (id.startsWith(appDir)) {
        delete require.cache[id];
        /*let tid = setTimeout(function () {
            bundler.hmr.broadcast({
              type: "reload"
            });
            clearTimeout(tid);
          }, 2000);*/
      }
    }
  };
  const watcher = chokidar.watch(appDir);
  watcher.on("ready", function () {
    console.log("> Watching app dirs..\n");
    watcher.on("add", reload);
    watcher.on("change", reload);
    watcher.on("unlink", reload);
  });
}

try {
  run();
} catch (ex) {
  console.error(ex.message);
  process.exit(1);
}
