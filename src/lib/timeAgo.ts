/** Formats an ISO timestamp as a relative "N units ago" string. Shared by
 *  any component that shows a live-fetched timestamp (GitHub activity,
 *  per-repo vitals) so the phrasing stays consistent across the site. */
export function timeAgo(iso: string): string {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  const units: [number, string][] = [
    [60, 'second'],
    [60, 'minute'],
    [24, 'hour'],
    [7, 'day'],
    [4.345, 'week'],
    [12, 'month']
  ];
  let value = seconds;
  let unit = 'second';
  for (const [size, name] of units) {
    if (value < size) break;
    value = Math.floor(value / size);
    unit = name;
  }
  const rounded = Math.max(1, Math.round(value));
  return `${rounded} ${unit}${rounded === 1 ? '' : 's'} ago`;
}
