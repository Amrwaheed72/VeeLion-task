import { ActivityLog } from "@/types/api";
import { formatDateTime } from "../utils";

const Activities = async ({ activities }: { activities: ActivityLog[] }) => {
  return (
    <section className="card activities-card">
      <ul className="activities-list">
        {activities.map((item) => (
          <li key={item.id} className="activity-item">
            <div className="activity-action">
              {item.action || "(no action)"}
            </div>
            <div>{item.info || "(no info)"}</div>
            <small className="activity-date">{formatDateTime(item.when)}</small>
            <br />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Activities;
