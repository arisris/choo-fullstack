module.exports = function () {
  this.name = "posts";
  this.timestamp = true;
  this.fields = {
    author: ["users", "posts"],
    title: String,
    content: String
  };
};
