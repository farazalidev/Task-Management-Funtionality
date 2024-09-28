export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email:string
}

export interface Comment {
  _id: string;
  comment: string;
  by: User;
}
export interface Task {
  _id: string;
  title: string;
  description: string;
  assinged_to: User;
  due_date: string;
  priority: 'low' | 'medium' | 'high'; 
  status: string;
  workspace:string
}

export interface TaskDetailsResponse {
  task: Task;
  comments: Comment[];
}