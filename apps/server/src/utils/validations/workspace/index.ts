import { z } from "zod";
import { ObjectIdSchema } from "../utilvalidations";

export const CreateWorkSpaceSchema = z.object({
  name: z.string().min(3),
});

export const AddUserToWorkspaceSchema = z.object({
  user_email: z.string().email(),
  workspace_id: ObjectIdSchema,
});

export type CreateWorkspaceBody = z.infer<typeof CreateWorkSpaceSchema>;
export type AddUserToWorkspaceBody = z.infer<typeof AddUserToWorkspaceSchema>;
