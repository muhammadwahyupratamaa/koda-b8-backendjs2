import { Router } from "express";
import authRouter from "./auth.router.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Sticky Notes API",
  });
});

router.use("/auth", authRouter);

export default router;