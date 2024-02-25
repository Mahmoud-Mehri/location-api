import { Request, Response, NextFunction } from "express";

export const handle404 = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: "false", message: "Route Not Found!" });
};
