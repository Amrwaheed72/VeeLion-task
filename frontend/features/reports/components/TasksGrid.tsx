import { TasksGridProps } from "@/types/Props.types";

const TasksGrid = ({ byStatus }: TasksGridProps) => {
  const { todo, done } = byStatus;
  return (
    <div className="grid">
      <div className="status-card status-todo">
        <p className="status-title">To Do</p>
        <p className="status-value">{todo}</p>
      </div>

      <div className="status-card status-progress">
        <p className="status-title">In Progress</p>
        <p className="status-value">{byStatus["in-progress"]}</p>
      </div>

      <div className="status-card status-done">
        <p className="status-title">Done</p>
        <p className="status-value">{done}</p>
      </div>
    </div>
  );
};

export default TasksGrid;
