import mongoose from "mongoose";
import { collectionNames } from "./names";

const TaksCommentSchema = new mongoose.Schema({
  task: { type: mongoose.Schema.ObjectId, ref: collectionNames.TASK },
  comment: { type: String, required: true },
  by: { type: mongoose.Schema.ObjectId, ref: collectionNames.USER },
});

export const TaskCommentModel = mongoose.model(
  collectionNames.TASK_COMMENT,
  TaksCommentSchema,
);
