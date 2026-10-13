export default function FormattedDate({ date }: { date: string | Date }) {
  const value = new Date(date);
  if (Number.isNaN(value.valueOf())) return null;
  return (
    <time dateTime={value.toISOString()}>
      {value.toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </time>
  );
}
