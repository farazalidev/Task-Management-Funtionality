import { TaksModel } from "../models/task.model";
import { workspaceModel } from "../models/workspace.model";

export const getAdminWorkspaces = async (userId: string | undefined) => {
  const workspaces = await workspaceModel.find({ admin: userId });
  return workspaces.map(workspace => workspace._id.toString());
};

export const getTasksData = async (workspaceIds: string[], filter: object = {}) => {
  const tasks = await TaksModel.find({ workspace: { $in: workspaceIds }, ...filter }).populate("assinged_to");
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const priorityDistribution = tasks.reduce(
    (acc, current) => {
      if (current?.priority) {
        acc[current.priority] = (acc[current.priority] || 0) + 1;
      }
      return acc;
    },
    { low: 0, medium: 0, high: 0 }
  );
  const completedPercentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  return { tasks, totalTasks, completedTasks, priorityDistribution, completedPercentage };
};