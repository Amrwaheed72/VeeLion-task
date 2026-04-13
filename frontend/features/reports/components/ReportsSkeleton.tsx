export default function ReportsSkeleton() {
  return (
    <div className="report-panel">
      <header className="report-header">
        <div className="report-main-stat">
          <div className="skeleton skel-stat-icon" />
          <div className="skeleton skel-stat-title" />
          <div className="skeleton skel-stat-value" />
        </div>

        <div className="report-main-stat">
          <div className="skeleton skel-stat-icon" />
          <div className="skeleton skel-stat-title" />
          <div className="skeleton skel-stat-value" />
        </div>
      </header>
      <section className="report-body">
        <div className="skeleton skel-section-title" />
        <div className="skeleton task-progress-bar" />
        <div className="grid">
          <div className="skeleton skel-status-card" />
          <div className="skeleton skel-status-card" />
          <div className="skeleton skel-status-card" />
        </div>
      </section>
    </div>
  );
}
