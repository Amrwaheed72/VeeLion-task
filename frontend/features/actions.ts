"use server";

import { serverActionWrapper } from "@/lib/server-action-wrapper";
import { ActivityLog, Task, TasksSummary } from "@/types/api";
import { revalidateTag } from "next/cache";

export const refetchAction = (tag: string) => {
  return revalidateTag(tag);
};

export const getActivity = async () => {
  return serverActionWrapper<ActivityLog[]>("/activity", {
    method: "GET",
    next: { tags: ["activity-feed"], revalidate: 3600 },
  });
};

export const getTasks = async () => {
  return serverActionWrapper<Task[]>("/tasks", {
    method: "GET",
    next: { tags: ["tasks"], revalidate: 3600 },
    mapResponse: (json) => json.data,
  });
};

export const updateTaskStatus = async (taskId: string, completed: boolean) => {
  return serverActionWrapper<Task>(`/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify({ completed }),
    onSuccess: () => revalidateTag("tasks"),
  });
};

export const getReportsSummary = async () => {
  return serverActionWrapper<TasksSummary>("/reports/tasks-summary", {
    method: "GET",
    next: { tags: ["reports"], revalidate: 3600 },
  });
};
