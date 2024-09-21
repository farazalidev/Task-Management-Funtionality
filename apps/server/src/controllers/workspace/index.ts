import { RequestHandler } from "express";
import {
  AddUserToWorkspaceBody,
  CreateWorkspaceBody,
} from "../../utils/validations/workspace";
import { workspaceModel } from "../../models/workspace.model";
import { workspaceUserModel } from "../../models/workspaceuser.model";
import { UserModel } from "../../models/user.model";

export const createWorkspaceController: RequestHandler = async (req, res) => {
  try {
    const user = req.local_user;
    const { name } = req.body as CreateWorkspaceBody;

    const newWorkspace = new workspaceModel({
      name,
      admin: user?._id,
    });

    await newWorkspace.save();

    return res.status(200).json({ message: "workspace created" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export const getMyWorkspacesController: RequestHandler = async (req, res) => {
  try {
    const user = req.local_user;

    const workspaces = await workspaceModel.find({ admin: user?._id });

    return res.status(200).json({ workspaces });
  } catch (error) {
    return res.status(500).json({ message: "unable to get workspaces", error });
  }
};

export const getWorkspacesController: RequestHandler = async (req, res) => {
  try {
    const user = req.local_user;
    const workspaces = await workspaceUserModel
      .find({ user: user?._id })
      .populate("workspace");

    return res.status(200).json({ workspaces });
  } catch (error) {
    return res.status(500).json({ message: "unable to get workspaces", error });
  }
};

export const addUserToWorkspace: RequestHandler = async (req, res) => {
  try {
    const { user_email, workspace_id } = req.body as AddUserToWorkspaceBody;
    const user = await UserModel.findOne({ email: user_email });

    if (!user) {
      return res.status(404).json({
        message: "cannot add user to this workspace as it does not exists",
      });
    }

    const workspaceUser = await workspaceUserModel.findOneAndUpdate(
      { user: user._id, workspace: workspace_id },
      {
        user: user._id,
        workspace: workspace_id,
        role: "readonly",
      },
      { upsert: true, new: true },
    );

    if (workspaceUser) {
      return res
        .status(201)
        .json({ message: `user added to workspace ${req.workspace?.name}` });
    } else {
      return res
        .status(400)
        .json({ message: "unable to add user to workspace" });
    }
  } catch (error) {
    return res.status(500).json({ message: "failed to add user to workspace" });
  }
};
