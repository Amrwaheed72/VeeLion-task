const defaultFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});
export const formatDateTime = (dateString: string) => {
  if (!dateString) return "N/A";
  return defaultFormatter.format(new Date(dateString));
};
