import express from "express";
import router from "./src/routes/index.js";
import corsMiddleware from "./src/middlewares/cors.js";

const app = express();

app.use(express.json());
app.use(corsMiddleware);

app.use(router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});