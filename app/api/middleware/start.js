const util = require("util");
const os = require("os");
const bodyParser = require("body-parser")

const dump = a => `<pre>${a.map(i => util.inspect(i) + os.EOL)}</pre>`;

const stepOne = (req, res, next) => {
  res.dump = (...args) => res.send(dump(args));
  if (process.env.NODE_ENV !== "production") {
    res.app.set("json spaces", 2);
    res.dump = next;
  }
  next();
};

module.exports = [stepOne, bodyParser.json()];
