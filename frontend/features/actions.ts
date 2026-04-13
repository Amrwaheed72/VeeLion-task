"use server";

import { serverActionWrapper } from "@/lib/server-action-wrapper";
import { ActivityLog, Task } from "@/types/api";
import { revalidateTag } from "next/cache";

export const refetchAction = (tag: string) => {
  return revalidateTag(tag);
};

export const getActivity = async () => {
  return serverActionWrapper<ActivityLog[]>("/activity", {
    method: "GET",
    next: { tags: ["activity-feed"], revalidate: 5000 },
  });
};

export const getTasks = async () => {
  return serverActionWrapper<Task[]>("/tasks", {
    method: "GET",
    next: { tags: ["tasks"], revalidate: 5000 },
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
