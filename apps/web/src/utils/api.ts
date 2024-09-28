import { LoginFormInputs } from "@/components/auth/LoginForm";
import { RegistrationFormInputs } from "@/components/auth/RegistrationFor";
import { TaskFormInputs } from "@/components/workspace/Task/AddTaskForm";
import { WorkspaceFormData } from "@/components/workspace/WorkspaceForm";
import Cookies from 'js-cookie';
import axios from "axios";

export const axiosInstance = () => {
  const accessToken = Cookies.get('accessToken');

  return axios.create({
    baseURL: 'http://localhost:8081/api',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const GetMyWorkspaces = async () => {
  const response = await axiosInstance().get("/workspace/myworkspace");
  return response;
};

export const GetWorkspaces = async () => {
  const response = await axiosInstance().get("/workspace");
  return response;
};

export const AddWorkspaceMutation = async (workspaceData: WorkspaceFormData) => {
  const response = await axiosInstance().post("/workspace", workspaceData);
  return response.data;
};

export const GetWorkspaceTasks = async (endpoint: string, wid: string) => {
  const response = axiosInstance().get(endpoint, { params: { workspace_id: wid } })
  return response
}
export const AddTask = async (body: TaskFormInputs & { workspace_id: string }) => {
  const response = await axiosInstance().post("/workspace/task", body)
  return response
}
export const AddUser = async (body: { user_email: string, workspace_id: string }) => {
  const response = await axiosInstance().post("/workspace/adduser", body);
  return response
}

export const GetWorkspaceUsers = async (workspace_id: string) => {
  const response = await axiosInstance().get("/workspace/users", { params: { workspace_id } })
  return response
}
export const LoginUser = async (body: LoginFormInputs) => {
  const response = await axiosInstance().post("/auth/login", body, { withCredentials: true });
  return response
}

export const RegisterUser = async (body: RegistrationFormInputs) => {
  const response = await axiosInstance().post("/auth/register", body, { withCredentials: true });
  return response
}
export const GetUserTasksReports = async () => {
  const response = await axiosInstance().get("/user/reports")
  return response
}
export const GetTaskDetails = async (task_id: string, workspace_id: string) => {
  const response = await axiosInstance().get(`/workspace/taskDetails`, { params: { task_id, workspace_id } })
  return response.data
}

export const AddCommentToTask = async (task_id: string, comment: string, workspace_id: string) => {
  const response = await axiosInstance().post('/workspace/task/addComment', { task_id, workspace_id, comment })
  return response
}

export const GetMyWorkspacesReports = async (all: boolean, by_user: string | undefined, from: string | undefined, to: string | undefined) => {
  const params = {
    all,
    by_user,
    from,
    to
  }
  if (!by_user || by_user ==="undefined") {
    delete params.by_user
  }
  if (by_user && by_user !== "undefined") [
    params.all = false
  ]
  console.log(params);
  

  const response = await axiosInstance().get("/myworkspaces/myReports", { params })
  return response
}

export const GetMyWorkspacesAllUsers = async () => {
  const response = await axiosInstance().get("/myworkspaces/allUsers");
  return response
}