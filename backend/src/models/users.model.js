import { readData, writeData } from "../lib/storage.js";

const FILE_NAME = "users.json";

async function readUsers() {
  return await readData(FILE_NAME);
}

async function writeUsers(users) {
  await writeData(FILE_NAME, users);
}

function getNextId(users) {
  if (users.length === 0) {
    return 1;
  }

  return users[users.length - 1].id + 1;
}


export async function findAll() {
  return await readUsers();
}
 
export async function findByEmail(email) {
  const users = await readUsers();

  return users.find((user) => user.email === email);
}

export async function create(data) {
  const users = await readUsers();

  const now = new Date().toISOString();

  const newUser = {
    id: getNextId(users),
    ...data,
    created_at: now,
    updated_at: now,
  };

  users.push(newUser);

  await writeUsers(users);

  return newUser;
}