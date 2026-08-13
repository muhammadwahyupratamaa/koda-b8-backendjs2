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
  const result = await pool.query(
    `
    INSERT INTO notes (title, content, user_id)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [data.title, data.content, data.user_id],
  );

  return result.rows[0];
}

export async function update(id, data) {
  const result = await pool.query(
    `
    UPDATE notes
    SET
      title = $1,
      content = $2,
      updated_at = NOW()
    WHERE id = $3
    RETURNING *;
    `,
    [data.title, data.content, id],
  );

  return result.rows[0];
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
