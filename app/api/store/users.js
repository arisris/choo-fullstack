const bcrypt = require("bcrypt");

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
  this.fillable = ["name", "email", "password"];
  this.hidden = ["password"];
  const self = this;
  this.on("create", async record => {
    record.password = await bcrypt.hash(record.password, 10);
  });
  this.on("update", record => {});
  this.on("output", record => {
    //delete record.password;
  });
};
