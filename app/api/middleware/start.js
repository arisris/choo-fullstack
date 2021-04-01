const util = require("util");
const os = require("os");
const bodyParser = require("body-parser")

const dump = _ => `<pre>${_.map(i => util.inspect(i) + os.EOL)}</pre>`;

const stepOne = (req, res, next) => {
  res.dump = next;
  if (process.env.NODE_ENV !== "production") {
    res.app.set("json spaces", 2);
    res.dump = (..._) => res.send(dump(_));
  }
  next();
};

module.exports = [stepOne, bodyParser.json()];
