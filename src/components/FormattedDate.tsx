export default function FormattedDate({ date }: { date: string | Date }) {
  const value = new Date(date);
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
