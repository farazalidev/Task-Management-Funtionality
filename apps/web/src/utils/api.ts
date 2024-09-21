import axios from "axios";

export const axiosInstance = () => {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZlZTcyZmU3YWRjNWQ5YWRjNDExYWNlIiwiaWF0IjoxNzI2OTE5MjI1LCJleHAiOjE3Mjc1MjQwMjV9.gHDU02psPUb_OHQ7ybwpEbapj1UR-qoh6UPzZrGh0UA";

  return axios.create({
    baseURL: "http://localhost:8081/api",
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
