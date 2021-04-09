const crypto = require("crypto");
const util = require("util");
const { passwordHash } = require("../lib/utils");
const store = require("./");
const randomBytes = util.promisify(crypto.randomBytes);

module.exports = function () {
  this.name = "users";
  this.timestamp = true;
  this.fields = {
    name: String,
    email: String,
    email_verified_at: Date,
    password: String,
    password_reset_token: String,
    posts: [Array("posts"), "author"]
  };
  const self = this;
  this.on("create", async record => {
    const { transaction } = self.context;
    const random = await randomBytes(10);
    record.password_reset_token = random.toString("hex");
    record.password = await passwordHash(record.password);
  });
  this.on("update", async record => {
    if (record.password) {
      record.password = await passwordHash(record.password);
    }
  });
};
