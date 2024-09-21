import { Router } from "express";
import { validateBodySchema } from "../../middlewares/validateBodySchema";
import {
  AddUserToWorkspaceSchema,
  CreateWorkSpaceSchema,
} from "../../utils/validations/workspace";
import {
  addUserToWorkspace,
  createWorkspaceController,
  getMyWorkspacesController,
  getWorkspacesController,
} from "../../controllers/workspace";
import { authorize } from "../../middlewares/auth";
import { workspaceGuard } from "../../middlewares/workspace.guard";

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

export { router as WorkspaceRoutes };
