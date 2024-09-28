import { Router } from "express";
import { validateBodySchema } from "../../middlewares/validateBodySchema";
import {
  addCommentToTaskSchema,
  AddUserToWorkspaceSchema,
  CreateWorkSpaceSchema,
  CreateWorkspaceTaskSchema,
  GetMyWorkspacesReportsSchema,
  getTaskDetailsSchema,
  GetWorkspaceTasksSchema,
  ReAssignTaskSchema,
} from "../../utils/validations/workspace";
import {
  addCommentsToTask,
  addUserToWorkspace,
  createWorkspaceController,
  createWorkspaceTask,
  getMyworkspacesAllUsers,
  getMyWorkspacesController,
  getMyWorkspacesReports,
  getTaskDetails,
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
router.get("/workspace/users", authorize, validateQuerySchema(GetWorkspaceTasksSchema), workspaceGuard("admin"), getWorkspaceUsers)

router.get("/workspace/tasks", authorize, validateQuerySchema(GetWorkspaceTasksSchema), getWorkspaceTasks)
router.post("/workspace/task", authorize, validateBodySchema(CreateWorkspaceTaskSchema), workspaceGuard("admin"), createWorkspaceTask)
router.get("/workspace/taskDetails", authorize, workspaceGuard(["admin", "editor", "readonly"]), validateQuerySchema(getTaskDetailsSchema), getTaskDetails)
router.put("/workspace/reassignTask", authorize, validateBodySchema(ReAssignTaskSchema), workspaceGuard("admin"), reAssignTaskToUser)
router.post("/workspace/task/addComment", authorize, workspaceGuard(["admin", "editor", "readonly"]), validateBodySchema(addCommentToTaskSchema), addCommentsToTask)

router.get("/myworkspaces/myReports", authorize, validateQuerySchema(GetMyWorkspacesReportsSchema), getMyWorkspacesReports)
router.get("/myworkspaces/allUsers",authorize,getMyworkspacesAllUsers)


export { router as WorkspaceRoutes };
