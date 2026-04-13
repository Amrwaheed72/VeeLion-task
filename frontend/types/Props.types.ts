import { Task, TaskFilter } from "./api";

export type StatusFilterProps = {
  value: TaskFilter;
  onChange: (value: TaskFilter) => void;
};

export type TaskItemProps = {
  task: Task;
  onToggleOptimistic: (id: string) => void;
};

export type TaskListProps = {
  tasks: Task[];
  onToggleOptimistic: (id: string) => void;
};

export type EmptyStateProps = {
  title?: string;
  message?: string;
  onRefresh?: () => void;
};

export type ActivityInfo = {
  total: number;
  shown: number;
};
export type ActivityFeedInfoProps = {
  activityInfo: ActivityInfo;
  query: string;
  setQuery: (key: string) => void;
};

export type ReportHeaderProps = {
  total: number;
  recentActivityCount: number;
};
export type BarsProps = {
  todoPercentage: number;
  progressPercentage: number;
  donePercentage: number;
};
export type TasksGridProps = {
  byStatus: {
    todo: number;
    "in-progress": number;
    done: number;
  };
};
