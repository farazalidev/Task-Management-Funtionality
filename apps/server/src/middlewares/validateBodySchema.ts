import { RequestHandler } from "express";
import { ZodError, ZodSchema } from "zod";

export const validateBodySchema = (schema: ZodSchema<any>): RequestHandler => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle Zod validation errors
        return res.status(400).json({
          message: "validation failed",
          errors: error.errors.map((e) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        });
      }
      next(error);
    }
  };
};
