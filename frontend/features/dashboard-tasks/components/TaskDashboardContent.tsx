import "../styles.css";
import { getTasks, refetchAction } from "@/features/actions";
import TaskDashboardClient from "./TaskDashboardClient";
import ErrorFallback from "@/components/ErrorFallback";
import Empty from "@/components/Empty";

const TaskDashboardContent = async () => {
  const { data, error } = await getTasks();
  const refetch = refetchAction.bind(null, "tasks");
  if (error) {
    return <ErrorFallback error={error} reset={refetch} />;
  }
  if (!data) {
    return <Empty message="No tasks available at the moment." />;
  }
  return <TaskDashboardClient tasks={data} />;
};

export default TaskDashboardContent;
