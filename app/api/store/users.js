exports.name = "users";

exports.types = {
  name: String,
  email: String,
  email_verified_at: Date,
  password: String,
  password_reset_token: String,
  posts: [Array("posts"), "author"],
  created_at: Date,
  updated_at: Date
}

/*
exports.onInput = function() {

}

exports.onOutput = function() {

}*/