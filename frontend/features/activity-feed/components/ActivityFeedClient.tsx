"use client";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { ActivityLog } from "@/types/api";
import ActivityFeedInfo from "./ActivityFeedInfo";
import Activities from "./Activities";
import useFilter from "../hooks/useFilter";

const ActivityFeedClient = ({
  initialData,
}: {
  initialData: ActivityLog[];
}) => {
  const [query, setQuery] = useState<string | "">("");
  const debouncedSearch = useDebounce(query, 400);
  const resultActivities = useFilter(debouncedSearch, initialData);

  const activityInfo = {
    total: initialData.length,
    shown: resultActivities.length,
  };

  return (
    <>
      <ActivityFeedInfo
        query={query}
        setQuery={setQuery}
        activityInfo={activityInfo}
      />
      <Activities activities={resultActivities} />
    </>
  );
};

export default ActivityFeedClient;
