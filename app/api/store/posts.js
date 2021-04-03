exports.name = "posts";

exports.types = {
  author: ["users", "posts"],
  title: String,
  content: String,
  created_at: Date,
  updated_at: Date
}