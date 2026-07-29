import { Router } from "express";
import {
  create,
  findAllNotes,
  findNoteById,
  updateNote,
  removeNote,
} from "../controllers/notes.controller.js";

const router = Router();

router.post("/", create);
router.get("/", findAllNotes);
router.get("/:id", findNoteById);
router.put("/:id", updateNote);
router.delete("/:id", removeNote);

export default router;
