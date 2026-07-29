import bcrypt from "bcrypt";
import * as users from "../models/users.model.js";
import { constants } from "node:http2";

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
