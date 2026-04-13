import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <header className="home-header">
        <h1 className="home-title">VeeLion Frontend Assessment</h1>
        <p className="home-subtitle">
          Three separate modules built against the provided backend.
        </p>
      </header>

      <section className="modules-grid">
        <Link href="/tasks" className="card module-card">
          <div className="module-icon">📋</div>
          <h2 className="module-title">Task Dashboard</h2>
          <p className="module-desc">
            Manage, filter, and update your tasks efficiently.
          </p>
          <span className="module-link">Explore &rarr;</span>
        </Link>
        <Link href="/activity" className="card module-card">
          <div className="module-icon">⚡</div>
          <h2 className="module-title">Activity Feed</h2>
          <p className="module-desc">
            Track real-time system activities and user logs.
          </p>
          <span className="module-link">Explore &rarr;</span>
        </Link>
        <Link href="/reports" className="card module-card">
          <div className="module-icon">📊</div>
          <h2 className="module-title">Reports UI</h2>
          <p className="module-desc">
            View statistics, summaries, and system insights.
          </p>
          <span className="module-link">Explore &rarr;</span>
        </Link>
      </section>
    </main>
  );
}
