export let users = [];

export function findUser(email) {
  return users.find((user) => user.email === email);
}

export function addUser(data) {
  users.push(data);
}
