import bcrypt from "bcryptjs";

export let users = [
  {
    id: "test-user-1",
    name: "Test User",
    email: "test@nutriexplore.com",
    password: bcrypt.hashSync("password123", 10),
  },
];

export function findUser(email) {
  return users.find((user) => user.email === email);
}

export function addUser(data) {
  users.push(data);
}
