import * as notes from "../models/notes.model.js";
import { constants } from "node:http2";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
export async function create(req, res) {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        message: "Title and content are required",
      });
    }

    const newNote = await notes.create({
      title,
      content,
      user_id: req.user.id,
    });

    return res.status(constants.HTTP_STATUS_CREATED).json({
      message: "Note created successfully",
      data: newNote,
    });
  } catch (error) {
    console.error(error);

    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
export async function findAllNotes(req, res) {
  try {
    const data = await notes.findAllByUserId(req.user.id);

    return res.status(constants.HTTP_STATUS_OK).json({
      message: "success",
      data,
    });
  } catch (error) {
    console.log(error);

    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: "internal server error",
    });
  }
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
export async function findNoteById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const note = await notes.findById(id);

    if (!note) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        message: "Note Not Found",
      });
    }

    if (note.user_id !== req.user.id) {
      return res.status(constants.HTTP_STATUS_FORBIDDEN).json({
        message: "Forbidden",
      });
    }

    return res.status(constants.HTTP_STATUS_OK).json({
      message: "success",
      data: note,
    });
  } catch (error) {
    console.log(error);

    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
export async function updateNote(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;

    const note = await notes.findById(id);

    if (!note) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        message: "Note not found",
      });
    }

    if (note.user_id !== req.user.id) {
      return res.status(constants.HTTP_STATUS_FORBIDDEN).json({
        message: "Forbidden",
      });
    }

    const updatedNote = await notes.update(id, {
      title,
      content,
    });

    return res.status(constants.HTTP_STATUS_OK).json({
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    console.log(error);

    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
}

/**
 *
 * @param {import ("express").Request} req
 * @param {import ("express").Response} res
 * @returns
 */
export async function removeNote(req, res) {
  try {
    const id = parseInt(req.params.id);
    const note = await notes.findById(id);

    if (!note) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        message: "Note not found",
      });
    }

    if (note.user_id !== req.user.id) {
      return res.status(constants.HTTP_STATUS_FORBIDDEN).json({
        message: "Forbidden",
      });
    }

    await notes.remove(id);

    return res.status(constants.HTTP_STATUS_OK).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
}
