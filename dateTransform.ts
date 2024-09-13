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

// // Example usage
// const timestamp = "2024-07-11T09:15:00Z"; // UTC timestamp
// const timeZone = "America/New_York"; // Your time zone
// const readableDate = transformTimestamp(timestamp, timeZone);
// console.log(readableDate); // Output: "Thursday 11 July 2024 09:15:00" (in New York time zone)
