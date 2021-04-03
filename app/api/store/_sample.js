const faker = require("faker");
const utils = require("../lib/utils");
const bcrypt = require("bcrypt");

exports.users = Array(10)
  .fill()
  .map(() => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    email_verified_at: new Date(),
    password: bcrypt.hashSync("password", 10),
    password_reset_token: faker.random.alphaNumeric(10),
    created_at: new Date(),
    updated_at: new Date()
  }));
exports.posts = Array(10)
  .fill()
  .map(() => ({
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(4),
    created_at: new Date(),
    updated_at: new Date()
  }));