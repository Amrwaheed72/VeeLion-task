import { ActivityLog } from "@/types/api";
import { useMemo } from "react";

const useFilter = (debouncedSearch: string, initialData: ActivityLog[]) => {
  const resultActivities = useMemo(() => {
    if (!debouncedSearch) return initialData;
    const lowerCase = debouncedSearch.toLowerCase();
    return initialData.filter(
      (item) =>
        item.action?.toLowerCase().includes(lowerCase) ||
        item.info?.toLowerCase().includes(lowerCase),
    );
  }, [debouncedSearch, initialData]);
  return resultActivities;
};

export default useFilter;
