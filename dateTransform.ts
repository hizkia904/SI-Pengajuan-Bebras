import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export default function transformTimestamp(timestamp: string | Date): string {
  // Convert the timestamp to a Date object
  let date: Date;
  if (timestamp instanceof Date) {
    date = timestamp;
  } else {
    date = new Date(timestamp);
  }

  // Convert the Date object to the specified time zone
  const zonedDate = toZonedTime(date, "Asia/Jakarta");

  // Format the date in a readable format
  const formattedDate = format(zonedDate, "eeee dd MMMM yyyy HH:mm:ss");

  return formattedDate;
}
