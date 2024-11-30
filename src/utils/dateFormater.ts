import {
  differenceInDays,
  format,
  formatDistanceToNow,
  parseISO,
} from "date-fns";

export function formatTimeAgo(date: string) {
  const targetDate = parseISO(date);
  return formatDistanceToNow(targetDate, { addSuffix: true });
}

export function dateDiffrence(date: string, date2: string) {
  const targetDate = parseISO(date);
  const targetDate2 = parseISO(date2);
  return Math.abs(differenceInDays(targetDate2, targetDate));
}

export function formatDateMdy(date: string) {
  const targetDate = parseISO(date);
  return format(targetDate, "MMMM dd, yyyy");
}
