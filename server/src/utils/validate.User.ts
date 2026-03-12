import { NextFunction, Request, Response } from "express";

export function validateUser(req: Request, res: Response, next: NextFunction) {
  const user = req.currentUser;
  if (!user) return res.status(401).send();

  next();
}
