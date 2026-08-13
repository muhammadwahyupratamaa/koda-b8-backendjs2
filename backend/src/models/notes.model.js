import pool from "../lib/db.js";

export async function findAll() {
  const result = await pool.query(`
    SELECT *
    FROM notes
    ORDER BY id ASC
  `);

  return result.rows;
}

export async function findAllByUserId(userId) {
  const result = await pool.query(
    `
    SELECT *
    FROM notes
    WHERE user_id = $1
    ORDER BY id ASC
    `,
    [userId],
  );

  return result.rows;
}

export async function findById(id) {
  const result = await pool.query(
    `
    SELECT *
    FROM notes
    WHERE id = $1
    LIMIT 1
    `,
    [id],
  );

  return result.rows[0];
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
