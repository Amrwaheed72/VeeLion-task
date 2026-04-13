import "../styles.css";
import Empty from "@/components/Empty";
import ErrorFallback from "@/components/ErrorFallback";
import { getReportsSummary, refetchAction } from "@/features/actions";
import ReportsHeader from "./ReportsHeader";
import Bars from "./Bars";
import TasksGrid from "./TasksGrid";

const ReportsContent = async () => {
  const { data, error } = await getReportsSummary();
  const refetch = refetchAction.bind(null, "reports");

  if (error) {
    return <ErrorFallback error={error} reset={refetch} />;
  }
  if (!data) {
    return <Empty message="No reports available at the moment." />;
  }
  const { total, byStatus, recentActivityCount } = data;

  const safeTotal = total > 0 ? total : 1;
  const todoPercentage = (byStatus.todo / safeTotal) * 100;
  const progressPercentage = (byStatus["in-progress"] / safeTotal) * 100;
  const donePercentage = (byStatus.done / safeTotal) * 100;
  return (
    <div className="report-panel">
      <ReportsHeader total={total} recentActivityCount={recentActivityCount} />
      <section className="report-body">
        <h2 className="section-title">Task Completion Status</h2>
        <Bars
          todoPercentage={todoPercentage}
          progressPercentage={progressPercentage}
          donePercentage={donePercentage}
        />
        <TasksGrid byStatus={byStatus} />
      </section>
    </div>
  );
};

export default ReportsContent;
