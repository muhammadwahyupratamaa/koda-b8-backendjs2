import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import {
  create,
  findAllNotes,
  findNoteById,
  updateNote,
  removeNote,
} from "../controllers/notes.controller.js";

const router = Router();
router.use(authMiddleware);

/**
 * @openapi
 * /notes:
 *   get:
 *     tags:
 *      - Notes
 *     description: Display All Notes!
 *     security:
 *      - token: []
 *     responses:
 *       200:
 *         description: get all notes.
 */
router.get("/", findAllNotes);

/**
 * @openapi
 * /notes:
 *   post:
 *     tags:
 *      - Notes
 *     description: Add New Notes!
 *     requestBody:
 *       description: Input Title and Content Notes
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             required:
 *              - title
 *              - content
 *             type: object
 *             properties:
 *              title:
 *               type: string
 *              content:
 *               type: string
 *     security:
 *      - token: []
 *     responses:
 *       200:
 *         description: Create Note Success.
 */
router.post("/", create);

/**
 * @openapi
 * /notes/{id}:
 *   get:
 *     tags:
 *       - Notes
 *     description: Get note by ID
 *     security:
 *       - token: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Note ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Note not found
 */
router.get("/:id", findNoteById);

/**
 * @openapi
 * /notes/{id}:
 *   put:
 *     tags:
 *       - Notes
 *     description: Update note
 *     security:
 *       - token: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Note ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update Success
 *       404:
 *         description: Note not found
 */
router.put("/:id", updateNote);

/**
 * @openapi
 * /notes/{id}:
 *   delete:
 *     tags:
 *       - Notes
 *     description: Delete note
 *     security:
 *       - token: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Note ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Delete Success
 *       404:
 *         description: Note not found
 */
router.delete("/:id", removeNote);

export default router;
