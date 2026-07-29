import express from "express";
import corsMiddleware from "./src/middlewares/cors.js";
import authRouter from "./src/routes/auth.router.js";

const app = express();

app.use(express.urlencoded());
app.use(corsMiddleware);

app.use("/auth", authRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
