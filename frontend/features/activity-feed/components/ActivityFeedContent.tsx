import "../styles.css";
import ErrorFallback from "@/components/ErrorFallback";
import { getActivity, refetchAction } from "../../actions";
import Empty from "@/components/Empty";
import ActivityFeedClient from "./ActivityFeedClient";

const ActivityFeedContent = async () => {
  const { data, error } = await getActivity();
  const refetch = refetchAction.bind(null, "activity-feed");
  if (error) {
    return <ErrorFallback error={error} reset={refetch} />;
  }
  if (!data || data.length === 0) {
    return <Empty />;
  }
  return <ActivityFeedClient initialData={data} />;
};

export default ActivityFeedContent;
