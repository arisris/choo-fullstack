const path = require("path");
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(require("./app/index.server.js"));
app.listen(3000, () => console.log(`App is now run at port 30000`));