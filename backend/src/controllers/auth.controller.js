import bcrypt from "bcrypt";
import * as users from "../models/users.model.js";
import { constants } from "node:http2";
import jwt from "jsonwebtoken";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        message: "Name, email, and password are required",
      });
    }

    const existingUser = await users.findByEmail(email);

    if (existingUser) {
      return res.status(constants.HTTP_STATUS_CONFLICT).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
    });

    const { password: _, ...user } = newUser;

    return res.status(constants.HTTP_STATUS_CREATED).json({
      message: "Register success",
      data: user,
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
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        message: "Email and password are required",
      });
    }

    const user = await users.findByEmail(email);

    if (!user) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
        message: "Invalid password",
      });
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1d",
      },
    );

    const { password: _, ...userData } = user;

    return res.status(constants.HTTP_STATUS_OK).json({
      message: "Login success",
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
}
