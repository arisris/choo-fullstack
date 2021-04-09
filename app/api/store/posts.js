module.exports = function () {
  this.name = "posts";
  this.timestamp = true;
  this.fields = {
    author: ["users", "posts"],
    title: String,
    content: String
  };
  const self = this;
  this.on("output", async function(record) {
    //console.log(await self.context.transaction.find("users"));
  })
};
