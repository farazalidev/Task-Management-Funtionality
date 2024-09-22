import { Router } from "express";
import { validateBodySchema } from "../../middlewares/validateBodySchema";
import {
  AddUserToWorkspaceSchema,
  CreateWorkSpaceSchema,
  CreateWorkspaceTaskSchema,
  GetWorkspaceTasksSchema,
  ReAssignTaskSchema,
} from "../../utils/validations/workspace";
import {
  addUserToWorkspace,
  createWorkspaceController,
  createWorkspaceTask,
  getMyWorkspacesController,
  getWorkspacesController,
  getWorkspaceTasks,
  getWorkspaceUsers,
  reAssignTaskToUser,
} from "../../controllers/workspace";
import { authorize } from "../../middlewares/auth";
import { workspaceGuard } from "../../middlewares/workspace.guard";
import { validateQuerySchema } from "../../middlewares/validateQuerySchema";

const router = Router();

router.post(
  "/workspace",
  authorize,
  validateBodySchema(CreateWorkSpaceSchema),
  createWorkspaceController,
);

router.post(
  "/workspace/adduser",
  authorize,
  validateBodySchema(AddUserToWorkspaceSchema),
  workspaceGuard("admin"),
  addUserToWorkspace,
);

router.get("/workspace/myworkspace", authorize, getMyWorkspacesController);
router.get("/workspace", authorize, getWorkspacesController);
router.get("/workspace/users",authorize,validateQuerySchema(GetWorkspaceTasksSchema),workspaceGuard("admin"),getWorkspaceUsers)

router.get("/workspace/tasks",authorize,validateQuerySchema(GetWorkspaceTasksSchema),getWorkspaceTasks)
router.post("/workspace/task",authorize,validateBodySchema(CreateWorkspaceTaskSchema),workspaceGuard("admin"),createWorkspaceTask)
router.put("/workspace/reassignTask",authorize,validateBodySchema(ReAssignTaskSchema),workspaceGuard("admin"),reAssignTaskToUser)

export { router as WorkspaceRoutes };
