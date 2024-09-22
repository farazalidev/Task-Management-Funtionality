import { RequestHandler } from "express";
import { TaksModel } from "../../models/task.model";
import { UserModel } from "../../models/user.model";

export const GetTasksReports: RequestHandler = async (req, res) => {
  try {
    const local_user = req.local_user;
    console.log("local user",local_user);
    

    const tasks = await TaksModel.find({ assinged_to: local_user?._id.toString() }).populate("workspace").populate('assinged_to')

    console.log("tasks",tasks);
    

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === "completed").length;
    const assignedTasksCount = tasks.filter(task => task.assinged_to).length;

    const priorityDistribution = tasks.reduce((acc, task) => {
      // @ts-ignore
      acc[task?.priority] = (acc[task?.priority] || 0) + 1;
      return acc;
    }, { low: 0, medium: 0, high: 0 });

    const percentageCompleted = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

    const user = await UserModel.findById(local_user?._id);

    return res.status(200).json({
      user: user ? { firstName: user.first_name, lastName: user.last_name } : null,
      totalTasks,
      completedTasks,
      assignedTasksCount,
      percentageCompleted,
      priorityDistribution,
      tasks: tasks.map(task => ({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        // @ts-ignore
        workspaceName: task.workspace ? task.workspace?.name : "Unknown Workspace",
      })),
    });

  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve tasks by user ID" });
  }
};