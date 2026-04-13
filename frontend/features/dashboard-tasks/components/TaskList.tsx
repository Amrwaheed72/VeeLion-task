import { TaskItem } from "@/features/dashboard-tasks/components/TaskItem";
import Empty from "@/components/Empty";
import { TaskListProps } from "@/types/Props.types";

export function TaskList({ tasks, onToggleOptimistic }: TaskListProps) {
  if (tasks.length === 0) {
    return <Empty message="There are no tasks to shown right now" />;
  }

  return (
    <section aria-label="Task list">
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleOptimistic={onToggleOptimistic}
          />
        ))}
      </ul>
    </section>
  );
}
