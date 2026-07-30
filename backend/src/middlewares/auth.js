import { constants } from "node:http2";
import { verify } from "../lib/jwt.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
      message: "Unauthorized",
    });
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
      message: "Invalid token",
    });
  }

  try {
    const payload = verify(token);

    req.user = payload;

    next();
  } catch (error) {
    return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
      message: "Invalid or expired token",
    });
  }
}