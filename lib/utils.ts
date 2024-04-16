import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Converts a date string to a human-readable "time since" string.
 *
 * @param value The date string to convert (format: 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @returns A human-readable string representing the time since the provided date.
 */
export function toTimeSinceString(value: string): string {
    // Define time constants in seconds
    const SECOND = 1;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const MONTH = 30 * DAY;

    // Parse the date string to a Date object
    const date = new Date(value);

    // Get the current time
    const now = new Date();

    // Calculate the time difference in seconds
    const ts = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (ts < 0) {
        return 'one second ago';
    }

    // Determine the appropriate time unit and format the result string
    if (ts < 1 * MINUTE) {
        return ts === 1 ? 'one second ago' : `${ts} seconds ago`;
    }

    if (ts < 60 * MINUTE) {
        const minutes = Math.floor(ts / MINUTE);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }

    if (ts < 120 * MINUTE) {
        return 'an hour ago';
    }

    if (ts < 24 * HOUR) {
        const hours = Math.floor(ts / HOUR);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }

    if (ts < 48 * HOUR) {
        return 'Yesterday';
    }

    if (ts < 30 * DAY) {
        const days = Math.floor(ts / DAY);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }

    if (ts < 12 * MONTH) {
        const months = Math.floor(ts / DAY / 30);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    }

    const years = Math.floor(ts / DAY / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
}
