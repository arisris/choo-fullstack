const faker = require("faker");
const { randomString } = require("../lib/utils");

const adminID = randomString(15);
const adminID2 = randomString(15);

const fakeUsers = Array(8)
  .fill()
  .map(() => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    email_verified_at: new Date(),
    password: "password"
  }));
exports.users = [
  {
    id: adminID,
    name: "Admin",
    role: "admin",
    email: "admin@example.net",
    email_verified_at: new Date(),
    password: "admin12345"
  },
  {
    id: adminID2,
    name: "Admin2",
    role: "admin",
    email: "admin2@example.net",
    email_verified_at: new Date(),
    password: "admin12345"
  },
  ...fakeUsers
];
exports.posts = Array(10)
  .fill()
  .map(() => ({
    title: faker.lorem.sentence(),
    author: adminID,
    content: faker.lorem.paragraphs(4)
  }));
