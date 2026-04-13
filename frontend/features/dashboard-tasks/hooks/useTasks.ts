"use client";

import { useMemo, useState } from "react";
import type { Task, TaskFilter } from "@/types/api";

export function useTasks(tasks: Task[]) {
  const [filter, setFilter] = useState<TaskFilter>("all");
  const filteredTasks = useMemo(() => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }
    if (filter === "pending") {
      return tasks.filter((task) => !task.completed);
    }
    return tasks;
  }, [tasks, filter]);

  return {
    tasks,
    filteredTasks,
    filter,
    setFilter,
  };
}
