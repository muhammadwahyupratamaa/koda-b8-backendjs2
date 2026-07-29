import { Router } from "express";
import authRouter from "./auth.router.js";
import notesRouter from "./notes.router.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Sticky Notes API",
  });
});

router.use("/auth", authRouter);
router.use("/notes", notesRouter);
export default router;
