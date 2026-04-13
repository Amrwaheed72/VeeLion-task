import { TasksGridProps } from "@/types/Props.types";

const TasksGrid = ({ byStatus }: TasksGridProps) => {
  const { todo, done } = byStatus;
  return (
    <div className="grid">
      <div className="status-card status-todo">
        <h4 className="status-title">To Do</h4>
        <p className="status-value">{todo}</p>
      </div>

      <div className="status-card status-progress">
        <h4 className="status-title">In Progress</h4>
        <p className="status-value">{byStatus["in-progress"]}</p>
      </div>

      <div className="status-card status-done">
        <h4 className="status-title">Done</h4>
        <p className="status-value">{done}</p>
      </div>
    </div>
  );
};

export default TasksGrid;
