import { RequestHandler } from "express";
import {
  AddTaskToCommentBody,
  AddUserToWorkspaceBody,
  CreateWorkspaceBody,
  CreateWorkspaceTaskBody,
  GetMyWorkspaceReportsQuery,
  GetTaskDetailsQuery,
  GetWorkspaceTasksBody,
  ReAssignTaskBodySchema,
} from "../../utils/validations/workspace";
import { workspaceModel } from "../../models/workspace.model";
import { workspaceUserModel } from "../../models/workspaceuser.model";
import { UserModel } from "../../models/user.model";
import { TaksModel } from "../../models/task.model";
import { TaskCommentModel } from "../../models/task.comment";
import { getAdminWorkspaces, getTasksData } from "../../utils/getTasksData";

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
    const current_user = req.local_user;
    const { user_email, workspace_id } = req.body as AddUserToWorkspaceBody;
    if (user_email === current_user?.email) {
      return res.status(400).json({ message: "you cannot not add your self in the worspace" })
    }
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

export const createWorkspaceTask: RequestHandler = async (req, res) => {
  try {
    const { assigned_to_email, description, due_date, priority, title, workspace_id, status } = req.body as CreateWorkspaceTaskBody

    const current_user = req.local_user;
    if (assigned_to_email === current_user?.email) {
      return res.status(400).json({ message: "you cannot not assign task yourself as admin" })
    }
    const workspaceUser = await UserModel.findOne({ email: assigned_to_email })

    if (!workspaceUser) {
      return res.status(400).json({ message: "task cannot assigned to user as it does not exists" });
    }

    const isValidWorkspaceUser = await workspaceUserModel.findOne({ user: workspaceUser?._id, workspace: workspace_id });

    if (!isValidWorkspaceUser) {
      return res.status(400).json({ message: "not a valid workspace user" });
    }

    const newTask = new TaksModel({
      assinged_to: workspaceUser._id,
      description,
      due_date,
      priority,
      title,
      status,
      workspace: workspace_id
    })

    await newTask.save();
    return res.status(201).json({ message: "new task added" })
  } catch (error) {
    return res.status(500).json({ message: "failed to create task" })

  }
}

export const reAssignTaskToUser: RequestHandler = async (req, res) => {
  try {


    const { assigned_to_email, task_id, workspace_id } = req.body as ReAssignTaskBodySchema;

    const workspaceUser = await UserModel.findOne({ email: assigned_to_email })

    if (!workspaceUser) {
      return res.status(400).json({ message: "unable to update this task, as user does not exists" })
    }

    const isUserIsInWorkspace = await workspaceUserModel.findOne({ user: workspaceUser?._id, workspace: workspace_id });

    if (!isUserIsInWorkspace) {
      return res.status(400).json({ message: "user is not in workspace, first add it" });
    }

    await TaksModel.findOneAndUpdate({ _id: task_id }, { assinged_to: workspaceUser?._id }, { new: true });

    return res.status(200).json({ message: "task updated" })
  } catch (error) {
    return res.status(500).json({ message: "failed to update task" })

  }
}

export const getWorkspaceTasks: RequestHandler = async (req, res, _next) => {
  try {
    const { workspace_id } = req.query as GetWorkspaceTasksBody;
    const current_user = req.local_user;
    const workspace = await workspaceModel.findOne({ _id: workspace_id });
    console.log(current_user?._id, workspace);


    if (!workspace) {
      return res.status(400).json({ message: "workspace not found" })
    }
    const user = req.local_user;

    if (current_user?._id.toString() === workspace.admin?.toString()) {

      const workspaceTasks = await TaksModel.find({ workspace: workspace_id }).populate("assinged_to");

      return res.status(200).json({ workspaceTasks, workspace })
    }
    else {
      const isUserOfWorkspace = await workspaceUserModel.findOne({ workspace: workspace_id, user: user?._id });

      if (!isUserOfWorkspace) {
        return res.status(401).json({ message: "unauthorized" })
      }

      const workspaceTasks = await TaksModel.find({ workspace: workspace_id }).populate("assinged_to");

      return res.status(200).json({ workspaceTasks, workspace })
    }


  } catch (error) {
    return res.status(500).json({ message: "failed to retrieve tasks" })
  }
}
export const getWorkspaceUsers: RequestHandler = async (req, res) => {
  try {

    const { workspace_id } = req.query;

    const users = await workspaceUserModel.find({ workspace: workspace_id }).populate("user")

    return res.status(200).json({ users })

  } catch (error) {
    return res.status(500).json({ message: "failed to retrive users" })

  }
}

export const getTaskDetails: RequestHandler = async (req, res) => {
  try {

    const { task_id } = req.query as GetTaskDetailsQuery

    const task = await TaksModel.findOne({ _id: task_id }).populate("assinged_to")

    const comments = await TaskCommentModel.find({ task: task_id }).populate("by")

    return res.status(200).json({ task, comments })

  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "failed to get task details" })

  }
}

export const addCommentsToTask: RequestHandler = async (req, res) => {
  try {
    const user = req.local_user;
    const { comment, task_id } = req.body as AddTaskToCommentBody;

    const task = await TaksModel.findOne({ _id: task_id });

    if (!task) {
      return res.status(400).json({ message: "task not found" })
    }

    const newComment = new TaskCommentModel({
      by: user?._id,
      comment,
      task: task_id
    })

    await newComment.save()
    return res.status(200).json({ message: "added comment" })

  } catch (error) {
    return res.status(500).json({ message: "unable to add comment" })

  }
}

export const getMyWorkspacesReports: RequestHandler = async (req, res) => {
  
  try {

    const user = req.local_user;
    const { from, to, all, by_user } = req.query as unknown as GetMyWorkspaceReportsQuery;

    const workspaceIds = await getAdminWorkspaces(user?._id.toString());
    const filters: any =all=="true"?{}:  { assinged_to: by_user as string };
    if (from && to) {
      filters.due_date = {
        $gte:  new Date(from),
        $lte:  new Date(to)
      }
    }
    const tasksData = await getTasksData(workspaceIds, filters);

    return res.status(200).json({ tasksData })

  } catch (error) {
    return res.status(500).json({ message: "failed to get reports" })

  }
}

export const getMyworkspacesAllUsers :RequestHandler= async (req,res) => {
  try {
    const workSpaces = await getAdminWorkspaces(req?.local_user?._id?.toString() as string);
    

    const users = await workspaceUserModel.find({ workspace: {$in:workSpaces} }).populate("user")

    
  return res.status(200).json({users})
  } catch (error) {
    // console.log(error);
    
    return res.status(500).json({message:"internal server error"})
    
  }
}