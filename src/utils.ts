import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, FormatDistanceToken, Locale } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatDistanceLocale: Record<FormatDistanceToken, string> = {
  lessThanXSeconds: "now",
  xSeconds: "now",
  halfAMinute: "now",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w", // Note: date-fns v3+ uses xWeeks
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}mo",
  xMonths: "{{count}}mo",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};

const shortEnLocale: Partial<Locale> = {
  formatDistance: (token: FormatDistanceToken, count: number): string => {
    const result = formatDistanceLocale[token];
    if (result === "now") {
      return "now";
    }
    return result.replace("{{count}}", count.toString());
  },
};

export const formatShorthand = (date: Date | number): string => {
  return formatDistanceToNow(date, {
    locale: shortEnLocale as Locale,
  });
};
