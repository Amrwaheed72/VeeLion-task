import Link from "next/link";

type EmptyStateProps = {
  title?: string;
  message?: string;
  onRefresh?: () => void;
};

const Empty = ({
  title = "It's quiet here...",
  message = "There is no activity to show right now.",
  onRefresh,
}: EmptyStateProps) => {
  return (
    <section className="empty-container">
      <div className="empty-icon">📭</div>
      <h2 className="empty-title">{title}</h2>
      <p className="empty-desc">{message}</p>

      <div className="empty-actions">
        <Link href="/" className="button">
          Go Home
        </Link>
        {onRefresh ? (
          <button type="button" className="button primary" onClick={onRefresh}>
            Refresh
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default Empty;
