import { readData, writeData } from "../lib/storage.js";

const FILE_NAME = "notes.json";

async function readNotes() {
  return await readData(FILE_NAME);
}

async function writeNotes(notes) {
  await writeData(FILE_NAME, notes);
}

function getNextId(notes) {
  if (notes.length === 0) {
    return 1;
  }

  return notes[notes.length - 1].id + 1;
}

export async function findAll() {
  return await readNotes();
}

export async function findAllByUserId(userId) {
  const notes = await readNotes();

  return notes.filter((note) => note.user_id === userId);
}

export async function findById(id) {
  const notes = await readNotes();

  return notes.find((note) => note.id === id);
}

export async function create(data) {
  const notes = await readNotes();

  const now = new Date().toISOString();

  const newNote = {
    id: getNextId(notes),
    ...data,
    created_at: now,
    updated_at: now,
  };

  notes.push(newNote);

  await writeNotes(notes);

  return newNote;
}

export async function update(id, data) {
  const notes = await readNotes();

  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    return null;
  }

  notes[index] = {
    ...notes[index],
    ...data,
    updated_at: new Date().toISOString(),
  };

  await writeNotes(notes);

  return notes[index];
}

export async function remove(id) {
  const notes = await readNotes();

  const filteredNotes = notes.filter((note) => note.id !== id);

  if (filteredNotes.length === notes.length) {
    return false;
  }

  await writeNotes(filteredNotes);

  return true;
}
