import { Router } from "express";
import { create, findAllNotes, findNoteById,update } from "../controllers/notes.controller.js";

const router = Router();

router.post("/", create);
router.get("/", findAllNotes);
router.get("/:id", findNoteById);
router.put("/:id", update);

export default router;