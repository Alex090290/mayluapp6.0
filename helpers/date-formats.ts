export function hora(): string {
  const event: Date = new Date(Date.now());
  return event
    .toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();
}

export function fechaYhora(
  str: string | number | undefined
): string | undefined {
  if (!str) return undefined;
  const event: Date = new Date(str);
  return event
    .toLocaleTimeString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();
}
