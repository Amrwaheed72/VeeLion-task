import { useEffect, useState } from "react";

export const useDebounce = (query: string, timeValue: number) => {
  const [debouncedValue, setDebouncedValue] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(query);
    }, timeValue);
    return () => clearTimeout(timer);
  }, [query]);

  return debouncedValue;
};
