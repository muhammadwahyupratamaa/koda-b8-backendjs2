import jwt from "jsonwebtoken";
import {constants} from "node:http2"

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
    const payload = jwt.verify(token, process.env.JWT_KEY);

    req.user = payload;

    next();
  } catch (error) {
    return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
      message: "Invalid or expired token",
    });
  }
}