import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ErrorCode } from "../../../utils";
import config from "../../../config";

export const authenticator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["x-access-token"]?.toString();
  if (!token) {
    return res
      .status(ErrorCode.AuthFailed)
      .json({ success: false, data: null, message: "Authentication Failed" });
  }

  jwt.verify(token, config.http.sign.secretValue, (err, info) => {
    if (err) {
      return res
        .status(ErrorCode.AuthFailed)
        .json({ success: false, data: null, message: "Authentication Failed" });
    }

    // req.userId = info.userId;

    next();
  });
};
