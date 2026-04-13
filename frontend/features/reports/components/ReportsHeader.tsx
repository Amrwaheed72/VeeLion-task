import { ReportHeaderProps } from "@/types/Props.types";

const ReportsHeader = ({ total, recentActivityCount }: ReportHeaderProps) => {
  return (
    <header className="report-header">
      <div className="report-main-stat">
        <div className="stat-icon">📦</div>
        <h3 className="stat-title">Total Tasks</h3>
        <p className="stat-value">{total}</p>
      </div>

      <div className="report-main-stat">
        <div className="stat-icon">⚡</div>
        <h3 className="stat-title">Recent Activities</h3>
        <p className="stat-value primary">{recentActivityCount}</p>
      </div>
    </header>
  );
};

export default ReportsHeader;
