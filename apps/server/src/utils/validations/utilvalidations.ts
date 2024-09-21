import mongoose from "mongoose";
import { z } from "zod";

export const ObjectIdSchema = z.string().refine(
  (val) => {
    return mongoose.Types.ObjectId.isValid(val);
  },
  { message: "not a valid object id" },
);
