export default function TasksSkeleton() {
  return (
    <div className="stack">
      <section className="card">
        <div className="filters-wrapper">
          <div className="skeleton skel-filter-btn" />
          <div className="skeleton skel-filter-btn" />
          <div className="skeleton skel-filter-btn" />
        </div>
      </section>
      <section aria-label="Loading tasks">
        <ul className="task-list">
          {[1, 2, 3].map((i) => (
            <li key={i} className="card task-list-item">
              <div className="task-list-content">
                <div className="skeleton skel-task-title" />
                <div className="skeleton skel-task-badge" />
              </div>
              <div className="skeleton skel-task-date" />
              <div>
                <div className="skeleton skel-task-btn" />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
