import { Request, NextFunction, Response } from "express";
import { validationResult } from "express-validator";

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    next();
    return;
  }
  const message = errors.array()[0].msg;
  res.status(422).send({
    ok: false,
    code: "validation_error",
    message: message,
  });
};
