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

export async function findAllNotes(req, res) {
  try {
    const data = await notes.findAll();

    return res.status(constants.HTTP_STATUS_OK).JSON({
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

export async function findNoteById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const note = await notes.findById;

    if (!note) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        message: "Note Not Found",
      });
    }

    return res.status(constants.HTTP_STATUS_OK).json({
      message: "success",
    });
  } catch (error) {
    console.log(error);

    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
}
