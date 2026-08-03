import express from "express";
import corsMiddleware from "./src/middlewares/cors.js";
import router from "./src/routes/index.js";

import pool from "./src/lib/db.js";

try {
  await pool.query("SELECT NOW()");
  console.log("✅ Database connected");
} catch (error) {
  console.log(error);
}

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(corsMiddleware);

app.use(router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});