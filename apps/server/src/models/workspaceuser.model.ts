import mongoose from "mongoose";
import { collectionNames } from "./names";

const worksSpaceUserSchema = new mongoose.Schema(
  {
    workspace: {
      type: mongoose.Schema.ObjectId,
      ref: collectionNames.WORKSPACE,
    },
    user: { type: mongoose.Schema.ObjectId, ref: collectionNames.USER },
    role: { type: String, enum: ["editor", "readonly"] },
    joined_at: { type: Date, required: true, default: Date.now() },
  },
  { timestamps: true },
);

export const workspaceUserModel = mongoose.model(
  collectionNames.WORKSPACE_USER,
  worksSpaceUserSchema,
);
