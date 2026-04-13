"use client";
import { StatusFilter } from "@/features/dashboard-tasks/components/StatusFilter";
import { TaskList } from "@/features/dashboard-tasks/components/TaskList";
import { useTasks } from "@/features/dashboard-tasks/hooks/useTasks";
import { Task } from "@/types/api";
import { useOptimistic } from "react";

const TaskDashboardClient = ({ tasks }: { tasks: Task[] }) => {
  const [optimisticTasks, toggleOptimisticTask] = useOptimistic(
    tasks,
    (currentTasks, taskIdToToggle: string) => {
      return currentTasks.map((task) =>
        task.id === taskIdToToggle
          ? { ...task, completed: !task.completed }
          : task,
      );
    },
  );
  const { filteredTasks, filter, setFilter } = useTasks(optimisticTasks);

  return (
    <section className="stack">
      <StatusFilter value={filter} onChange={setFilter} />
      <TaskList
        tasks={filteredTasks}
        onToggleOptimistic={toggleOptimisticTask}
      />
    </section>
  );
};

export default TaskDashboardClient;
