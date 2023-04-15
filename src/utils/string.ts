import { formatDistance, isPast } from "date-fns";

export function toUrlFriendly(str: string): string {
  const urlFriendly = str.replace(/\s+/g, "-").toLowerCase();

  return urlFriendly.replace(/[^a-z0-9-]/g, "");
}

export function getTimeDifference(dateString: string): string {
  const givenDate = new Date(dateString);
  const now = new Date();
  const isDatePast = isPast(givenDate);

  if (isDatePast) {
    const timePassed = formatDistance(givenDate, now);
    return `Just missed by ${timePassed}`;
  } else {
    const remainingTime = formatDistance(givenDate, now);
    return `Closing in ${remainingTime}`;
  }
}
