import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const userValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  try {
    const validatedUser = schema.parse(req.body);
    req.body = validatedUser;
    next();
  } catch (err) {
    return res.status(400).json(err);
  }
};
