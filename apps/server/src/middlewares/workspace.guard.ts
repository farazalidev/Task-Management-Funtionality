import { RequestHandler } from "express";
import { workspaceModel } from "../models/workspace.model";
import { workspaceUserModel } from "../models/workspaceuser.model";

export type workspaceRoles = "admin" | "editor" | "readonly";
export const workspaceGuard = (role: workspaceRoles): RequestHandler => {
  return async (req, res, next) => {
    const workspace_id = req.body.workspace_id || req.query.workspace_id;

    if (!workspace_id) {
      return res.status(400).json({
        message: "workspace id was not incuded in the req body or query params",
      });
    }

    const user = req.local_user;

    if (role === "admin") {
      const workspace = await workspaceModel.findOne({
        _id: workspace_id,
        admin: user?._id,
      });

      if (workspace) {
        req.workspace = workspace;
        next();
      } else {
        return res.status(404).json({ message: "workspace does not exists" });
      }
    } else {
      const workspaceUser = await workspaceUserModel
        .findOne({
          user: user?._id,
          workspace: workspace_id,
          role,
        })
        .populate("workspace");

      if (workspaceUser) {
        req.workspace = workspaceUser.workspace;
        next();
      } else {
        return res.status(404).json({ message: "workspace does not exists" });
      }
    }
  };
};
