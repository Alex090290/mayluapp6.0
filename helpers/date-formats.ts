export function hora(): string {
  const event: Date = new Date(Date.now());
  return event
    .toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
    .toUpperCase();
}
