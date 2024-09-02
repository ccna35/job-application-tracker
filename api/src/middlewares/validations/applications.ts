import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const applicationValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = z.object({
    job_title: z.string().min(1, "Job title is required"),
    company_name: z.string().min(1, "Company name is required"),
    application_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    status: z.string().min(1, "Status is required"),
  });

  try {
    const validatedApplication = schema.parse(req.body);
    req.body = validatedApplication;
    next();
  } catch (err) {
    return res.status(400).json(err);
  }
};

// validate delete application
export const deleteApplicationValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = z.object({
    id: z.string().uuid(),
  });

  try {
    const validatedApplication = schema.parse(req.params);
    req.params = validatedApplication;
    next();
  } catch (err) {
    return res.status(400).json(err);
  }
};
