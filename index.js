process.env.BROWSERSLIST_IGNORE_OLD_DATA = true; // disable browserlist warnings
const path = require("path");
const fsj = require("fs-jetpack");
const express = require("express");
const chokidar = require("chokidar");
const Bundler = require("parcel-bundler");
const program = require("commander");

const outDir = path.join(__dirname, "public/parcel");
const appDir = path.join(__dirname, "app");
const state = { isFirstRun: true };
const app = express();
const bundler = new Bundler(path.join(appDir, "index.js"), {
  sourceMaps: false,
  autoInstall: false,
  outDir: outDir,
  publicUrl: "/parcel",
  scopeHoist: process.env.NODE_ENV === "production"
});

app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  require(path.join(appDir, "index.server"))(req, res, next);
});
function runWatcher() {
  const reload = function () {
    for (let id in require.cache) {
      if (id.startsWith(appDir)) {
        delete require.cache[id];
      }
    }
  };
  const watcher = chokidar.watch(appDir);
  watcher.on("ready", function () {
    console.log(`> Watching ./app/*`);
    watcher.on("add", reload);
    watcher.on("change", reload);
    watcher.on("unlink", reload);
  });
}
async function runApp(withBundle) {
  const listen = function (callback) {
    app.listen(3000, function () {
      console.log(`> Http Server is now run at port 3000`);
      callback();
    });
  };
  if (withBundle) {
    await fsj.removeAsync(outDir);
    bundler.on("buildEnd", function () {
      if (state.isFirstRun) {
        listen(() => {
          if (process.env.NODE_ENV !== "production") runWatcher();
          state.isFirstRun = false;
        });
      }
    });
    await bundler.bundle(); // stuck here
  } else {
    listen(() => {
      if (state.isFirstRun) {
        if (process.env.NODE_ENV !== "production") runWatcher();
        state.isFirstRun = false;
      }
    });
  }
}

program
  .version("1.0")
  .option("-a, --apionly", "Serve only api without bundling client")
  .parse(process.argv);

try {
  if (program.apionly) {
    runApp(false);
  } else {
    runApp(true);
  }
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
