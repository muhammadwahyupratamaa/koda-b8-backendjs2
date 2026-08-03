import pool from "../lib/db.js";

export async function findAll() {
  const result = await pool.query(`SELECT * FROM users ORDER BY id ASC`);
  return result.rows;
}

export async function findByEmail(email) {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE email = $1
    LIMIT 1
    `,
    [email],
  );

  return result.rows[0];
}

export async function create(data) {
  const result = await pool.query(
    `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [data.name, data.email, data.password],
  );

  return result.rows[0];
}
