"use client";
import { ActivityFeedInfoProps } from "@/types/Props.types";

const ActivityFeedInfo = ({
  activityInfo,
  query,
  setQuery,
}: ActivityFeedInfoProps) => {
  return (
    <section className="info-card">
      <input
        className="input"
        placeholder="Search activity"
        aria-label="search input"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <small className="activity-info ">
        Total: {activityInfo.total} | Visible: {activityInfo.shown}
      </small>
    </section>
  );
};

export default ActivityFeedInfo;
