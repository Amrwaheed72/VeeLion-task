export default async function ActivitySkeleton() {
  return (
    <div className="stack">
      <section className="info-card">
        <div className="skeleton skel-search"></div>
        <div className="skeleton skel-stats"></div>
      </section>

      <section className="card activities-card">
        <ul className="activities-list">
          {[1, 2, 3, 4].map((i) => (
            <li key={i} className="skel-item">
              <div className="skeleton skel-line-title"></div>
              <div className="skeleton skel-line-desc"></div>
              <div className="skeleton skel-line-date"></div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
