export function formatList(items: string[]): string {
  const filtered = items.filter((item) => item.trim().length > 0);
  if (filtered.length === 0) {
    return '';
  }
  if (filtered.length === 1) {
    return filtered[0];
  }
  if (filtered.length === 2) {
    return `${filtered[0]} and ${filtered[1]}`;
  }
  return `${filtered.slice(0, -1).join(', ')}, and ${filtered[filtered.length - 1]}`;
}
