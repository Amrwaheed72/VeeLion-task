import { BarsProps } from "@/types/Props.types";

const Bars = ({
  todoPercentage,
  progressPercentage,
  donePercentage,
}: BarsProps) => {
  return (
    <div className="task-progress-bar" aria-label="Task progress bar">
      <div
        className="progress-segment segment-todo"
        style={{ width: `${todoPercentage}%` }}
        title="To Do"
      />
      <div
        className="progress-segment segment-progress"
        style={{ width: `${progressPercentage}%` }}
        title="In Progress"
      />
      <div
        className="progress-segment segment-done"
        style={{ width: `${donePercentage}%` }}
        title="Done"
      />
    </div>
  );
};

export default Bars;
