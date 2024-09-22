import mongoose from "mongoose";
import { collectionNames } from "./names";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assinged_to: { type: mongoose.Types.ObjectId, ref: collectionNames.USER },
  due_date: {
    type: Date,
    required: true,
  },
  status:{type:String, enum:["completed","pending","in-progress"],default:"pending"},
  priority: { type: String, enum: ["low", "medium", "high"] },
  workspace: { type: mongoose.Schema.ObjectId, ref: collectionNames.WORKSPACE },
});

export const TaksModel = mongoose.model(collectionNames.TASK, TaskSchema);
