import mongoose from "mongoose";
import { collectionNames } from "./names";

const workspaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    admin: { type: mongoose.Schema.ObjectId, ref: collectionNames.USER },
  },
  { timestamps: true },
);

export const workspaceModel = mongoose.model(
  collectionNames.WORKSPACE,
  workspaceSchema,
);
