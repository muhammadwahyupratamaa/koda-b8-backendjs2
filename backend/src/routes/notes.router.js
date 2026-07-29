import { Router } from "express";
import { create, findAllNotes, findNoteById } from "../controllers/notes.controller.js";

const router = Router();

router.post("/", create);
router.get("/", findAllNotes);
router.get("/:id", findNoteById);

export default router;