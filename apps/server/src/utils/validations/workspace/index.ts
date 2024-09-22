import { z } from "zod";
import { ObjectIdSchema } from "../utilvalidations";

export const CreateWorkSpaceSchema = z.object({
  name: z.string().min(3),
});

export const AddUserToWorkspaceSchema = z.object({
  user_email: z.string().email(),
  workspace_id: ObjectIdSchema,
});

export const GetWorkspaceTasksSchema = z.object({
  workspace_id: ObjectIdSchema,
})

export const CreateWorkspaceTaskSchema = z.object({
  workspace_id: ObjectIdSchema,
  title: z.string().min(3).max(70),
  description: z.string().min(5),
  assigned_to_email: z.string().email(),
  due_date: z.string(),
  status:z.enum(["completed","pending","in-progress"]),
  priority: z.enum(["low", "medium", "high"]),
})

export const ReAssignTaskSchema = z.object({
  workspace_id: ObjectIdSchema,
  task_id: ObjectIdSchema,
  assigned_to_email:z.string().email()
})

export type CreateWorkspaceBody = z.infer<typeof CreateWorkSpaceSchema>;
export type AddUserToWorkspaceBody = z.infer<typeof AddUserToWorkspaceSchema>;
export type GetWorkspaceTasksBody= z.infer<typeof GetWorkspaceTasksSchema>
export type CreateWorkspaceTaskBody= z.infer<typeof CreateWorkspaceTaskSchema>
export type ReAssignTaskBodySchema =z.infer<typeof ReAssignTaskSchema>