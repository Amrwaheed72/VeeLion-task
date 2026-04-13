"use client";
import { updateTaskStatus } from "@/features/actions";
import { formatDateTime } from "@/features/utils";
import { TaskItemProps } from "@/types/Props.types";
import { useTransition } from "react";

export function TaskItem({ task, onToggleOptimistic }: TaskItemProps) {
  const [isPending, startTransition] = useTransition();
  const { id, completed } = task;

  const handleUpdateTaskStatus = () => {
    startTransition(async () => {
      onToggleOptimistic(id);
      const { error } = await updateTaskStatus(id, !completed);
      if (error) {
        console.error("Failed to update task");
      }
    });
  };
  return (
    <li className="card task-list-item">
      <div className="task-list-content">
        <p className="task-title">{task.title}</p>
        <span className="badge">
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <small className="task-updated">
        Updated: {formatDateTime(task.updatedAt)}
      </small>

      <div>
        <button
          type="button"
          className="button"
          onClick={handleUpdateTaskStatus}
          disabled={isPending}
          aria-label={`Mark ${task.title} as ${task.completed ? "pending" : "completed"}`}
        >
          {task.completed ? "Mark as Pending" : "Mark as Completed"}
        </button>
      </div>
    </li>
  );
}
