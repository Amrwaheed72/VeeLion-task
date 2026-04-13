import { ReportHeaderProps } from "@/types/Props.types";

const ReportsHeader = ({ total, recentActivityCount }: ReportHeaderProps) => {
  return (
    <header className="report-header">
      <div className="report-main-stat">
        <div className="stat-icon">📦</div>
        <p className="stat-title">Total Tasks</p>
        <p className="stat-value">{total}</p>
      </div>

      <div className="report-main-stat">
        <div className="stat-icon">⚡</div>
        <p className="stat-title">Recent Activities</p>
        <p className="stat-value primary">{recentActivityCount}</p>
      </div>
    </header>
  );
};

export default ReportsHeader;
