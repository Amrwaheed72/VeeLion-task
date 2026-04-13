export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ActivityLog = {
  id: string;
  action?: string;
  info?: string;
  when: string;
};

export type ActionResponse<T> = {
  data: T | null;
  error: string | null;
};
export type TasksResponse = {
  data: Task[];
};

export type ActivityResponse = {
  data: Task;
};
export type TaskResponse = {
  data: Task;
};

export type ErrorResponse = {
  error?: {
    message?: string;
  };
};

export type TaskFilter = "all" | "completed" | "pending";
